import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../log/log.entity';
import { LogService } from '../services/log.service';
import { DashboardController } from '../controllers/dashboard.controller';
import { DashboardService } from '../services/dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [DashboardController],
  providers: [DashboardService, LogService],
  exports: [DashboardService],
})
export class DashboardModule {}
