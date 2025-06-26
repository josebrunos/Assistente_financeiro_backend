// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(phoneNumber: string, name?: string) {
    // Find existing user
    const existingUser = await this.prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (existingUser) {
      return existingUser;
    }

    // Create new user if doesn't exist
    return this.prisma.user.create({
      data: {
        phoneNumber,
        name: name || phoneNumber, // Use phone number as name if not provided
      }
    });
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId }
    });
  }

  async getUserByPhone(phoneNumber: string) {
    return this.prisma.user.findUnique({
      where: { phoneNumber }
    });
  }
}
