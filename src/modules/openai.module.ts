// src/openai/openai.module.ts
import { Module } from '@nestjs/common';
import { OpenaiService } from '../services/openai.service';
import { OpenaiController } from '../controllers/openai.controller';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule],
  controllers: [OpenaiController], // expoe os endpoints
  providers: [OpenaiService],      // fornece o servico de IA
})
export class OpenaiModule {}
