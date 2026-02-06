import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ProductEntity } from '../products/entities/product.entity';
@Module({
  imports : [TypeOrmModule.forFeature([OrderEntity,ProductEntity,CustomerEntity])],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule {}
