// src/user/user.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: { phoneNumber: string; name?: string }) {
    return this.userService.findOrCreateUser(
      userData.phoneNumber,
      userData.name,
    );
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get('phone/:phoneNumber')
  async getUserByPhone(@Param('phoneNumber') phoneNumber: string) {
    return this.userService.getUserByPhone(phoneNumber);
  }
}
