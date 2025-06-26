// src/transaction/dto/transaction.dto.ts
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  category?: string;
}

export class TransactionResponseDto {
  id: string;
  type: string;
  amount: number;
  description: string;
  timestamp: Date;
  userId: string;
  categoryId: string | null;
  category?: {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
  } | null;
}

export class BalanceDto {
  income: number;
  expenses: number;
  balance: number;
}

export class CategoryDto {
  id: string;
  name: string;
  transactionCount: number;
}

export class CategorySpendingDto {
  id: string;
  name: string;
  total: number;
}
