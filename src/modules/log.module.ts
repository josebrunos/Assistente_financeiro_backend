// src/log/log.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { LogService } from '../services/log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogService],
  exports: [LogService], // <-- Exporte o serviço para que outros módulos possam usá-lo
})
export class LogModule {}