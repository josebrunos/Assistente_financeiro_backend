// src/log/log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async registrar(pergunta: string, resposta: string): Promise<Log> {
    const novoLog = this.logRepository.create({ pergunta, resposta });
    return this.logRepository.save(novoLog);
  }
}