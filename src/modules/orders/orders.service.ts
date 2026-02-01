import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersResDto } from './dto/orders.res.dto';
import { ListOrdersReqDto } from './dto/list-orders.req';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { Logger } from '@nestjs/common';
import {Order} from '@/constants/app.constant';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<OrderEntity>,
    ){};

    async create(dto: CreateOrderDto): Promise<OrdersResDto> {
        const newOrder = this.orderRepo.create(dto);
        return await this.orderRepo.save(newOrder);
    }

    async findAll(reqDto: ListOrdersReqDto) :Promise<OffsetPaginatedDto<OrdersResDto>>{
        const order = reqDto.order ?? Order.DESC;

        const query = this.orderRepo
            .createQueryBuilder('orders')
            .orderBy('orders.createdAt', order)
            .addOrderBy('orders.id', order);
        /*
        if (reqDto.q?.trim()) {
            query.andWhere(
            '(posts.name LIKE :q OR posts.slug LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }
        */
        const [orders, metaDto] = await paginate<OrderEntity>(
            query, 
            reqDto,
            {
                skipCount: false,
                takeAll: false,
            }
        );

        return new OffsetPaginatedDto(
            plainToInstance(OrdersResDto, orders),
            metaDto
        );
    }

    async findOne(id: number) : Promise<OrdersResDto> {
        assert(id,'id is required');
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['tags', 'categories'],
        });
        return order.toDto(OrdersResDto);
    }

    update(id: number, dto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    async remove(id: number) {
        await this.orderRepo.findOneByOrFail({ id });
        await this.orderRepo.softDelete(id);
        return true;
    }
}
