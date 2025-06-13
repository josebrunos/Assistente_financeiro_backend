// src/openai/openai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { LogService } from '../log/log.service';

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
}