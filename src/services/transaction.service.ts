// src/transaction/transaction.service.ts
import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction/transaction.repository';
import {
  CreateTransactionDto,
  TransactionResponseDto,
  BalanceDto,
  CategoryDto,
  CategorySpendingDto,
} from '../dtos/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async createTransaction(
    data: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    // Check if the category exists, if not create it
    let categoryId: string | null = null;

    if (data.category) {
      const existingCategory = await this.transactionRepo.findCategory(
        data.category,
        data.userId,
      );

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const newCategory = await this.transactionRepo.createCategory(
          data.category,
          data.userId,
        );
        categoryId = newCategory.id;
      }
    }

    // Create the transaction
    const transactionData = {
      type: data.type,
      amount: data.amount,
      description: data.description,
      userId: data.userId,
      categoryId: categoryId || undefined,
    };

    return this.transactionRepo.createTransaction(transactionData);
  }

  async getTransactions(
    userId: string,
    limit = 10,
  ): Promise<TransactionResponseDto[]> {
    return this.transactionRepo.findTransactionsByUserId(userId, limit);
  }

  async getBalance(userId: string): Promise<BalanceDto> {
    const transactions =
      await this.transactionRepo.findAllTransactionsByUserId(userId);

    let income = 0;
    let expenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else if (transaction.type === 'expense') {
        expenses += transaction.amount;
      }
    });

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }

  async getCategories(userId: string): Promise<CategoryDto[]> {
    const categories =
      await this.transactionRepo.findCategoriesByUserId(userId);

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      transactionCount: category._count.transactions,
    }));
  }

  async getCategorySpending(userId: string): Promise<CategorySpendingDto[]> {
    const categories =
      await this.transactionRepo.findCategoriesWithTransactionsByUserId(userId);

    return categories
      .map((category) => {
        const total = category.transactions.reduce(
          (sum, t) => sum + t.amount,
          0,
        );
        return {
          id: category.id,
          name: category.name,
          total,
        };
      })
      .filter((cat) => cat.total > 0);
  }

  async deleteAllUserData(userId: string): Promise<{ success: boolean }> {
    // Delete all transactions for this user
    await this.transactionRepo.deleteTransactionsByUserId(userId);

    // Delete all categories for this user
    await this.transactionRepo.deleteCategoriesByUserId(userId);

    return { success: true };
  }
}
