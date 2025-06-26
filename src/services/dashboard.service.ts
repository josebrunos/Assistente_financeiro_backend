import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../log/log.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  // Get monthly spending and income stats
  async getMonthlyStats(): Promise<any> {
    const logs = await this.logRepository.find();
    const monthlyData: {
      [month: string]: {
        income: number;
        spending: number;
        transactions: number;
      };
    } = {};

    logs.forEach((log) => {
      const date = new Date(log.data_criacao);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      if (!monthlyData[month]) {
        monthlyData[month] = {
          income: 0,
          spending: 0,
          transactions: 0,
        };
      }

      // Extract amounts from the response
      const incomeMatches = log.resposta.match(
        /receita|renda|entrada|salário|recebido|recebimento/gi,
      );
      const spendingMatches = log.resposta.match(
        /gasto|despesa|saída|compra|pagamento/gi,
      );

      // Extract value amounts using regex
      const valueRegex = /R\$\s*([\d.,]+)/g;
      let match;

      while ((match = valueRegex.exec(log.resposta)) !== null) {
        if (Array.isArray(match) && typeof match[1] === 'string') {
          const value = parseFloat(match[1].replace('.', '').replace(',', '.'));

          if (!isNaN(value)) {
            if (incomeMatches && incomeMatches.length > 0) {
              monthlyData[month].income += value;
            } else if (spendingMatches && spendingMatches.length > 0) {
              monthlyData[month].spending += value;
            }

            monthlyData[month].transactions += 1;
          }
        }
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data,
    }));
  }

  // Get spending by category
  async getCategoryBreakdown(): Promise<any> {
    const logs = await this.logRepository.find();
    const categories = {};

    logs.forEach((log) => {
      const categoryRegex = /-\s*(.+?):\s*R\$?\s*([\d.,]+)/gi;
      let match;

      while ((match = categoryRegex.exec(log.resposta)) !== null) {
        let category: string | undefined = undefined;
        if (typeof match[1] === 'string') {
          category = match[1].trim().toLowerCase();
        }
        const value =
          typeof match[2] === 'string'
            ? parseFloat(match[2].replace('.', '').replace(',', '.'))
            : NaN;

        if (category && !isNaN(value)) {
          if (!categories[category]) {
            categories[category] = 0;
          }
          categories[category] += value;
        }
      }
    });

    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount,
    }));
  }

  // Get recent transactions
  async getRecentTransactions(limit: number = 10): Promise<any> {
    const logs = await this.logRepository.find({
      order: { data_criacao: 'DESC' },
      take: limit,
    });

    const transactions: {
      date: Date;
      type: string;
      value: number;
      description: string;
    }[] = [];

    /*    logs.forEach((log) => {
      const transactionRegex =
        /(receita|despesa|gasto|pagamento|entrada|renda).*?R\$\s*([\d.,]+)/gi;
      let match;

       while ((match = transactionRegex.exec(log.resposta)) !== null) {
        const type =
          match[1].toLowerCase().includes('receita') ||
          match[1].toLowerCase().includes('entrada') ||
          match[1].toLowerCase().includes('renda')
            ? 'income'
            : 'expense';

        let value = NaN;
        if (Array.isArray(match) && typeof match[2] === 'string') {
          value = parseFloat(match[2].replace('.', '').replace(',', '.'));
        }

        if (!isNaN(value)) {
          transactions.push({
            date: log.data_criacao,
            type,
            value,
            description: log.pergunta.substring(0, 50),
          });
        }
      } 
    });*/

    return transactions.slice(0, limit);
  }

  // Get savings goals and progress
  async getSavingsGoals(): Promise<any> {
    const logs = await this.logRepository.find();
    const goals = {};

    logs.forEach((log) => {
      const goalRegex =
        /(meta|objetivo|poupar|economizar|guardar).*?R\$\s*([\d.,]+)/gi;
      let match;

      while ((match = goalRegex.exec(log.resposta)) !== null) {
        const description =
          Array.isArray(match) && typeof match[0] === 'string'
            ? match[0].substring(0, 50)
            : '';
        const targetAmount =
          typeof match[2] === 'string'
            ? parseFloat(match[2].replace('.', '').replace(',', '.'))
            : NaN;

        if (!isNaN(targetAmount) && !goals[description]) {
          goals[description] = {
            target: targetAmount,
            current: 0,
            percentage: 0,
          };
        }
      }

      // Check for progress updates
      const progressRegex =
        /(economizei|poupei|guardei|juntei).*?R\$\s*([\d.,]+)/gi;

      while ((match = progressRegex.exec(log.resposta)) !== null) {
        const value = parseFloat(match[2].replace('.', '').replace(',', '.'));

        if (!isNaN(value)) {
          // Apply to the first goal found (could be improved)
          const firstGoal = Object.keys(goals)[0];
          if (firstGoal) {
            goals[firstGoal].current += value;
            goals[firstGoal].percentage =
              (goals[firstGoal].current / goals[firstGoal].target) * 100;
          }
        }
      }
    });

    return Object.entries(goals).map(([description, data]) => ({
      description,
      // ...data,
    }));
  }

  // Get financial health score
  async getFinancialHealthScore(): Promise<any> {
    const stats = await this.getMonthlyStats();

    if (stats.length === 0) {
      return { score: 50, status: 'Neutro' };
    }

    // Get the most recent month
    const latestMonth = stats.reduce((latest, current) => {
      return latest.month > current.month ? latest : current;
    });

    // Calculate income-to-expense ratio
    const ratio =
      latestMonth.income > 0
        ? latestMonth.income / (latestMonth.spending || 1)
        : 0;

    // Calculate score (0-100)
    let score = 50; // Neutral starting point

    if (ratio >= 2) {
      // Excellent: Income more than 2x expenses
      score = 90;
    } else if (ratio >= 1.5) {
      // Very Good
      score = 80;
    } else if (ratio >= 1.2) {
      // Good
      score = 70;
    } else if (ratio >= 1) {
      // Fair
      score = 60;
    } else if (ratio >= 0.8) {
      // Poor
      score = 40;
    } else if (ratio >= 0.5) {
      // Very Poor
      score = 30;
    } else {
      // Critical
      score = 20;
    }

    let status;
    if (score >= 80) status = 'Excelente';
    else if (score >= 70) status = 'Muito bom';
    else if (score >= 60) status = 'Bom';
    else if (score >= 50) status = 'Regular';
    else if (score >= 40) status = 'Insuficiente';
    else status = 'Crítico';

    return {
      score,
      status,
      incomeToExpenseRatio: ratio,
    };
  }
}
