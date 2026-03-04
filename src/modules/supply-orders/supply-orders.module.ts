import { Module } from '@nestjs/common';
import { SupplyOrdersService } from './supply-orders.service';
import { SupplyOrdersController } from './supply-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyOrderEntity } from './entities/supply-order.entity';
import { SupplyOrderDetailsEntity } from './entities/supply-order-details.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SupplyOrderEntity,SupplyOrderDetailsEntity])],
    controllers: [SupplyOrdersController],
    providers: [SupplyOrdersService],
})
export class SupplyOrdersModule {}
