import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerAddressEntity } from './entities/customer_address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ TypeOrmModule.forFeature([CustomerEntity, CustomerAddressEntity]) ],
    controllers: [CustomersController],
    providers: [CustomersService],
})
export class CustomersModule {}
