import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CreateUser, UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UsernameQuery } from '../../dist/datasource/datasource.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  @HttpCode(201)
  async signUp(@Body() user: CreateUser) {
    return await this.userService.createUser(user);
  }

  @Get('')
  @HttpCode(200)
  async filterUser(
    @Query() usernameQuery: UsernameQuery,
  ): Promise<UserEntity[]> {
    return await this.userService.filterByUsername(usernameQuery);
  }
}
