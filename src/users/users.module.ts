import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataSourceModule } from 'src/datasource/datasource.module';

@Module({
  imports: [DataSourceModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
