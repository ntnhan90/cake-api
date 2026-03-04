import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseResDto } from './dto/warehouse.res.dto';
import { ListWarehouseReqDto } from './dto/list-warehouse.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { Order } from '@/constants/app.constant';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WarehousesService {
    constructor(
        @InjectRepository(WarehouseEntity)
        private readonly warehouseRepo: Repository<WarehouseEntity>,
    ) {}

    async create(dto: CreateWarehouseDto):Promise<WarehouseResDto>  {
        const newWarehouse = this.warehouseRepo.create(dto);
        return await this.warehouseRepo.save(newWarehouse);
    }

    async findAll(reqDto:ListWarehouseReqDto) : Promise<OffsetPaginatedDto<WarehouseResDto>>{
        const order = reqDto.order ?? Order.DESC;

        const query = this.warehouseRepo
            .createQueryBuilder('warehouse')
            .orderBy('warehouse.createdAt', order)

        if (reqDto.q?.trim()) {
            query.andWhere(
            '(warehouse.name LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }

        const [contact,metaDto] = await paginate<WarehouseEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(WarehouseResDto, contact),metaDto)
    }

    async findOne(id: number)  :Promise<WarehouseResDto>{
      //  assert(id, 'id is required');
        const contact = await this.warehouseRepo.findOneByOrFail({id});
        return contact.toDto(WarehouseResDto)
    }

    async update(id: number, dto: UpdateWarehouseDto) {
        return `This action updates a #${id} warehouse`;
    }

    async remove(id: number) {
        await this.warehouseRepo.findOneByOrFail({id});
		await this.warehouseRepo.softDelete(id);
    }
}
