// src/openai/openai.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LogService } from '../services/log.service';
import { OpenaiService } from '../services/openai.service';

@Controller('chat') // Define o endpoint base: /chat
export class OpenaiController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly logService: LogService,
  ) {}

  // Rota POST /chat
  @Post()
  async conversar(@Body('mensagem') mensagem: string, @Res() res: Response) {
    if (!mensagem || mensagem.trim() === '') {
      return { erro: 'Mensagem vazia.' };
    }

    try {
      const resposta = await this.openaiService.enviarMensagem(mensagem);
      return { resposta };
    } catch {
      res.status(500).send('Erro ao processar a mensagem');
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

  @Get('chart')
  async gerarGrafico(@Query('query') query: string, @Res() res: Response) {
    try {
      // Generate a placeholder chart for now - in a real implementation,
      // you would analyze the query and generate a relevant chart
      const chartBuffer = await this.openaiService.gerarGrafico(query);

      // Set headers for image response
      res.set({
        'Content-Type': 'image/png',
        'Content-Length': chartBuffer.length,
      });

      // Send the image
      res.end(chartBuffer);
    } catch (err) {
      console.error('Erro ao gerar gráfico:', err);
      res.status(500).send('Erro ao gerar gráfico');
    }
  }
}
