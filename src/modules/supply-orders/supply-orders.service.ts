import { Injectable } from '@nestjs/common';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { UpdateSupplyOrderDto } from './dto/update-supply-order.dto';
import { SupplyOrdersResDto } from './dto/supply-order.res.dto';
import { ListSupplyOrdersReqDto } from './dto/list-supply-order.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyOrderEntity } from './entities/supply-order.entity';
import { SupplyOrderDetailsEntity } from './entities/supply-order-details.entity';
import { Repository } from 'typeorm';
import { Order } from '@/constants/app.constant';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SupplyOrdersService {
    constructor(
        @InjectRepository(SupplyOrderEntity)
        private readonly supplyOrderRepo: Repository<SupplyOrderEntity>,

        @InjectRepository(SupplyOrderDetailsEntity)
        private readonly supplyOrderDetailRepo: Repository<SupplyOrderDetailsEntity>,
    ) {}

    async create(dto: CreateSupplyOrderDto):Promise<SupplyOrdersResDto> {
        const newWarehouse = this.supplyOrderRepo.create(dto);
        return await this.supplyOrderRepo.save(newWarehouse);
    }

    async findAll(reqDto:ListSupplyOrdersReqDto): Promise<OffsetPaginatedDto<SupplyOrdersResDto>> {
        const order = reqDto.order ?? Order.DESC;

        const query = this.supplyOrderRepo
            .createQueryBuilder('supply_orders')
            .orderBy('supply_orders.createdAt', order)

        /*
        if (reqDto.q?.trim()) {
            query.andWhere(
            '(supply_orders.name LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }
        */
        const [contact,metaDto] = await paginate<SupplyOrderEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(SupplyOrdersResDto, contact),metaDto)
    }

    async findOne(id: number):Promise<SupplyOrdersResDto> {
        const contact = await this.supplyOrderRepo.findOneByOrFail({id});
        return contact.toDto(SupplyOrdersResDto)
    }

    async update(id: number, dto: UpdateSupplyOrderDto) {
        return `This action updates a #${id} supplyOrder`;
    }

    async remove(id: number) {
        await this.supplyOrderRepo.findOneByOrFail({id});
		await this.supplyOrderRepo.softDelete(id);
    }
}
