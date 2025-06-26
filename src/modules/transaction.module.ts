// src/transaction/transaction.module.ts
import { Module } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { TransactionController } from '../controllers/transaction.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionRepositoryModule } from '../repositories/transaction/transaction.repository.module';

@Module({
  imports: [PrismaModule, TransactionRepositoryModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
