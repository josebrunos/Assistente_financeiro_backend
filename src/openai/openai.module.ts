// src/openai/openai.module.ts
import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';

@Module({
  controllers: [OpenaiController], // expoe os endpoints
  providers: [OpenaiService],      // fornece o servico de IA
})
export class OpenaiModule {}
