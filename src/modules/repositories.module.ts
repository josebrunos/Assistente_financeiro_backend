// src/repositories/repositories.module.ts
import { Module } from '@nestjs/common';
import { TransactionRepositoryModule } from '../repositories/transaction/transaction.repository.module';

@Module({
  imports: [TransactionRepositoryModule],
  exports: [TransactionRepositoryModule],
})
export class RepositoriesModule {}
