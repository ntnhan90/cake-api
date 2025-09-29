import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [HealthModule, HomeModule],
})
export class ApiModule {}
