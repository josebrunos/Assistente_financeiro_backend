// src/app.module.ts
import { Module } from '@nestjs/common';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [OpenaiModule], // importa o modulo de IA
})
export class AppModule {}
