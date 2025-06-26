// src/transaction/transaction.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import {
  TransactionResponseDto,
  BalanceDto,
  CategoryDto,
  CategorySpendingDto,
  CreateTransactionDto,
} from '../dtos/transaction.dto';

@Controller('api/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get('user/:userId')
  async getUserTransactions(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
  ): Promise<TransactionResponseDto[]> {
    return this.transactionService.getTransactions(
      userId,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Get('balance/:userId')
  async getUserBalance(@Param('userId') userId: string): Promise<BalanceDto> {
    return this.transactionService.getBalance(userId);
  }

  @Get('categories/:userId')
  async getUserCategories(
    @Param('userId') userId: string,
  ): Promise<CategoryDto[]> {
    return this.transactionService.getCategories(userId);
  }

  @Get('category-spending/:userId')
  async getCategorySpending(
    @Param('userId') userId: string,
  ): Promise<CategorySpendingDto[]> {
    return this.transactionService.getCategorySpending(userId);
  }

  @Delete('user/:userId')
  async deleteUserData(
    @Param('userId') userId: string,
  ): Promise<{ success: boolean }> {
    return this.transactionService.deleteAllUserData(userId);
  }
}
