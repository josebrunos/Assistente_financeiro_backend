import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('monthly-stats')
  async getMonthlyStats() {
    const stats = await this.dashboardService.getMonthlyStats();
    return { data: stats };
  }

  @Get('category-breakdown')
  async getCategoryBreakdown() {
    const categories = await this.dashboardService.getCategoryBreakdown();
    return { data: categories };
  }

  @Get('recent-transactions')
  async getRecentTransactions(@Query('limit') limit: number = 10) {
    const transactions = await this.dashboardService.getRecentTransactions(limit);
    return { data: transactions };
  }

  @Get('savings-goals')
  async getSavingsGoals() {
    const goals = await this.dashboardService.getSavingsGoals();
    return { data: goals };
  }

  @Get('financial-health')
  async getFinancialHealth() {
    const health = await this.dashboardService.getFinancialHealthScore();
    return { data: health };
  }

  @Get('summary')
  async getDashboardSummary() {
    const [monthlyStats, categoryBreakdown, recentTransactions, financialHealth] = await Promise.all([
      this.dashboardService.getMonthlyStats(),
      this.dashboardService.getCategoryBreakdown(),
      this.dashboardService.getRecentTransactions(5),
      this.dashboardService.getFinancialHealthScore(),
    ]);

    return {
      monthlyStats: monthlyStats.slice(-3), // Last 3 months
      topCategories: categoryBreakdown.slice(0, 5), // Top 5 categories
      recentTransactions,
      financialHealth,
    };
  }
}
