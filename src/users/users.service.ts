import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import {
  DataSourceService,
  UsernameQuery,
} from '../datasource/datasource.service';

export interface CreateUser {
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private userRepository;
  private customUserRepository;
  private logger = new Logger();
  //   inject the Datasource provider
  constructor(
    private dataSource: DataSource,
    private dataSourceService: DataSourceService,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
    this.customUserRepository = this.dataSourceService.userCustomRepository;
  }
  //  create handler to create new user and save to the database
  async createUser(createUser: CreateUser): Promise<UserEntity> {
    try {
      const user = await this.userRepository.create(createUser);
      return await this.userRepository.save(user);
    } catch (err) {
      if (err.code == 23505) {
        this.logger.error(err.message, err.stack);
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      }
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }

  async filterByUsername(usernameQuery: UsernameQuery): Promise<UserEntity[]> {
    try {
      return await this.customUserRepository.filterUser(usernameQuery);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }
}
