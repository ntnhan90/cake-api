import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<OrderEntity>,

        @InjectRepository(CustomerEntity)
        private readonly customerRepo: Repository<CustomerEntity>,

        @InjectRepository(ProductEntity)
        private readonly productRepo: Repository<ProductEntity>,
    ) {}

    async getOverview(){
        const [orders, customers, products] = await Promise.all([
            this.orderRepo.count(),
            this.customerRepo.count(),
            this.productRepo.count(),
        ]);

        return {
            orders,
            customers,
            products,
        };
    }
}
