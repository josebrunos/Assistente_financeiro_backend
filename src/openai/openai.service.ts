// src/openai/openai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

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

  // Mensagens do chat, incluindo instrucao inicial do assistente
  private messages: Mensagem[] = [
    {
      role: 'system',
      content: `Você é um assistente financeiro pessoal inteligente.

- Sempre extraia e organize as informações financeiras do usuário com clareza.
- Categorize os gastos e receitas em categorias financeiras comuns (alimentação, transporte, moradia, lazer, renda, investimento, etc).
- Forneça resumos mensais, alertas sobre despesas altas ou fora do padrão.
- Explique os dados de forma simples, com exemplos práticos.
- Responda em formato claro, como listas ou linhas “chave: valor” para fácil uso em software.
- Seja educado e profissional, ajudando o usuário a entender melhor suas finanças.`,
    },
  ];

  // Limita o historico para nao crescer indefinidamente
  private limitarHistorico() {
    while (this.messages.length > MAX_HISTORY + 1) {
      this.messages.splice(1, 1); // Remove mensagens antigas do usuário
    }
  }

  // Funcao principal para enviar a mensagem do usuario e obter a resposta da IA
  async enviarMensagem(userInput: string): Promise<string> {
  this.messages.push({ role: 'user', content: userInput });

  try {
    const resposta = await this.client.chat.completions.create({
      model: MODELO_FIXO,
      messages: this.messages,
      temperature: 0,
    });

    // Verificacao segura
    const choice = resposta.choices?.[0];
    const content = choice?.message?.content?.trim();

    if (!content) {
      throw new Error('A resposta da IA veio vazia ou malformada.');
    }

    this.messages.push({ role: 'assistant', content });
    this.limitarHistorico();

    return content;
  } catch (err) {
    console.error('Erro na chamada da API:', err.message);
    throw new Error('Erro ao gerar resposta da IA');
  }
}
}
