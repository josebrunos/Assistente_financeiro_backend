// src/log/log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../log/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  // Registra as interações
  async registrar(pergunta: string, resposta: string): Promise<Log> {
    const novoLog = this.logRepository.create({ pergunta, resposta });
    return this.logRepository.save(novoLog);
  }

  // Busca o historico
  async buscarHistorico(
    limit: number,
  ): Promise<{ role: 'user' | 'assistant'; content: string }[]> {
    const logs = await this.logRepository.find({
      order: { data_criacao: 'ASC' },
      take: limit,
    });

    return logs.flatMap((log) => [
      { role: 'user', content: log.pergunta },
      { role: 'assistant', content: log.resposta },
    ]);
  }

  // Extrai saldo
  async calcularSaldo(): Promise<number> {
    const logs = await this.logRepository.find();
    let ultimoSaldo: number | null = null;

    logs.forEach((log) => {
      // Procura algo como "= R$ 2.200,00"
      const match = log.resposta.match(/=\s*R\$?\s*([\d.,]+)/);
      if (match) {
        const valor = parseFloat(match[1].replace('.', '').replace(',', '.'));
        if (!isNaN(valor)) {
          ultimoSaldo = valor;
        }
      }
    });

    return ultimoSaldo ?? 0;
  }

  // Extrai categorias
  async extrairCategorias(): Promise<Record<string, number>> {
    const logs = await this.logRepository.find();
    const categorias: Record<string, number> = {};

    logs.forEach((log) => {
      const regex = /-\s*(.+?):\s*R\$?\s*([\d.,]+)/gi;
      let match;
      while ((match = regex.exec(log.resposta)) !== null) {
        const categoria = match[1].trim().toLowerCase();
        const valor = parseFloat(match[2].replace('.', '').replace(',', '.'));

        if (!isNaN(valor)) {
          if (!categorias[categoria]) {
            categorias[categoria] = 0;
          }
          categorias[categoria] += valor;
        }
      }
    });

    return categorias;
  }

  // Apaga o historico
  async apagarHistorico(): Promise<void> {
    await this.logRepository.clear();
  }
}
