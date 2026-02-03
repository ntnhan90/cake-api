import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/order_product.entity';
import { OrderAddressesEntity } from './entities/order_addresses.entity';
@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity,OrderProductEntity,OrderAddressesEntity])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
