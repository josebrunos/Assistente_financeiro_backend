// src/openai/openai.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('chat') // Define o endpoint base: /chat
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  // Rota POST /chat
  @Post()
  async conversar(@Body('mensagem') mensagem: string) {
    if (!mensagem || mensagem.trim() === '') {
      return { erro: 'Mensagem vazia.' };
    }

    try {
      const resposta = await this.openaiService.enviarMensagem(mensagem);
      return { resposta };
    } catch (err) {
      return { erro: 'Erro ao processar a mensagem.' };
    }
  }
}
