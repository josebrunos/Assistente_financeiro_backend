// src/app.module.ts
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { OpenaiModule } from './openai/openai.module';

import { Log } from './log/log.entity';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Log],
      synchronize: true,
    }),
    OpenaiModule,
    LogModule,
  ], // importa o modulo de IA
})
export class AppModule {}

