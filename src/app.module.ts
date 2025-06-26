// src/app.module.ts
import { Module } from '@nestjs/common';
import { OpenaiModule } from './modules/openai.module';
import { LogModule } from './log/log.module';
import { DashboardModule } from './modules/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './modules/transaction.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    OpenaiModule,
    LogModule,
    DashboardModule,
    PrismaModule,
    TransactionModule,
    UserModule,
  ],
})
export class AppModule {}
