import { Module } from '@nestjs/common';
import { DataSourceService } from './datasource.service';
import { TypeOrmModule } from './typeorm.module';

@Module({
  imports: [TypeOrmModule],
  providers: [DataSourceService],
  exports: [DataSourceService],
})
export class DataSourceModule {}
