// src/openai/openai.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { LogService } from '../log/log.service';
import { Delete } from '@nestjs/common';

@Controller('chat') // Define o endpoint base: /chat
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService, private readonly logService: LogService) {}

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

  @Get('saldo')
    async obterSaldo() {
      const saldo = await this.logService.calcularSaldo();
      return { saldo: `R$ ${saldo.toFixed(2)}` };
    }

  @Get('categorias')
    async obterCategorias() {
      const categorias = await this.logService.extrairCategorias();
      return { categorias };
    }

  @Delete('historico')
    async apagarHistorico() {
      await this.logService.apagarHistorico();
      return { mensagem: 'Histórico apagado com sucesso.' };
}

}
