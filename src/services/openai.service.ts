// src/openai/openai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { LogService } from './log.service';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

interface Mensagem {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const token: string = process.env.GITHUB_TOKEN || '';
const endpoint: string = 'https://models.github.ai/inference';
const MODELO_FIXO = 'openai/gpt-4.1-mini';
const MAX_HISTORY = 10;

@Injectable()
export class OpenaiService {
  private client = new OpenAI({ baseURL: endpoint, apiKey: token });

  constructor(private readonly logService: LogService) {}

  // Instrução inicial do sistema
  private mensagemSistema: Mensagem = {
    role: 'system',
    content: `Você é um assistente financeiro pessoal inteligente.

- Sempre extraia e organize as informações financeiras do usuário com clareza.
- Categorize os gastos e receitas em categorias financeiras comuns (alimentação, transporte, moradia, lazer, renda, investimento, etc).
- Forneça resumos mensais, alertas sobre despesas altas ou fora do padrão.
- Explique os dados de forma simples, com exemplos práticos.
- Responda em formato claro, como listas ou linhas “chave: valor” para fácil uso em software.
- Seja educado e profissional, ajudando o usuário a entender melhor suas finanças.`,
  };

  async enviarMensagem(userInput: string): Promise<string> {
    try {
      // Recupera o histórico recente do banco
      const historico = await this.logService.buscarHistorico(MAX_HISTORY);

      // Monta o histórico completo com a instrução e a nova mensagem
      const mensagens: Mensagem[] = [
        this.mensagemSistema,
        ...historico,
        { role: 'user', content: userInput },
      ];

      const resposta = await this.client.chat.completions.create({
        model: MODELO_FIXO,
        messages: mensagens,
        temperature: 0,
      });

      const choice = resposta.choices?.[0];
      const content = choice?.message?.content?.trim();

      if (!content) {
        throw new Error('A resposta da IA veio vazia ou malformada.');
      }

      // Salva pergunta e resposta no banco
      await this.logService.registrar(userInput, content);

      return content;
    } catch (err) {
      console.error('Erro na chamada da API:', err.message);
      throw new Error('Erro ao gerar resposta da IA');
    }
  }

  // Method to generate financial charts based on user query
  async gerarGrafico(query: string): Promise<Buffer> {
    try {
      // For demo purposes, return a placeholder chart
      // In a real implementation, we would generate an actual chart based on the query
      // using a library like Chart.js, D3.js, or similar

      // Check if we have a chart for this query type
      const chartPath = this.getChartPathForQuery(query);

      if (fs.existsSync(chartPath)) {
        return fs.readFileSync(chartPath);
      } else {
        // If no specific chart, return a default chart
        const defaultChartPath = path.join(
          __dirname,
          '../../assets/default-chart.png',
        );

        // Create assets directory if it doesn't exist
        const assetsDir = path.join(__dirname, '../../assets');
        if (!fs.existsSync(assetsDir)) {
          fs.mkdirSync(assetsDir, { recursive: true });
        }

        // Create a simple placeholder image if default doesn't exist
        if (!fs.existsSync(defaultChartPath)) {
          // This is a minimal 1x1 pixel PNG buffer
          const placeholderPNG = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
            'base64',
          );
          fs.writeFileSync(defaultChartPath, placeholderPNG);
        }

        return fs.readFileSync(defaultChartPath);
      }
    } catch (err) {
      console.error('Error generating chart:', err);
      // Return an empty image if there's an error
      return Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        'base64',
      );
    }
  }

  private getChartPathForQuery(query: string): string {
    // Map common queries to chart images
    // In a real implementation, you would dynamically generate these
    const queryLower = query.toLowerCase();
    const assetsDir = path.join(__dirname, '../../assets');

    if (queryLower.includes('despesa') || queryLower.includes('gasto')) {
      return path.join(assetsDir, 'expense-chart.png');
    } else if (queryLower.includes('receita') || queryLower.includes('renda')) {
      return path.join(assetsDir, 'income-chart.png');
    } else if (queryLower.includes('categoria')) {
      return path.join(assetsDir, 'category-chart.png');
    } else if (queryLower.includes('tempo') || queryLower.includes('mês')) {
      return path.join(assetsDir, 'time-chart.png');
    } else {
      return path.join(assetsDir, 'default-chart.png');
    }
  }
}