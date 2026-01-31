import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ListDiscountReqDto } from './dto/list-discount.req.dto';
import { DiscountResDto } from './dto/discount.res.dto';
import { In,Repository } from 'typeorm';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';
import assert from 'assert';
import { Order } from '@/constants/app.constant';
@Injectable()
export class DiscountService {
    constructor(  
        @InjectRepository(DiscountEntity)
        private readonly discountRepo: Repository<DiscountEntity>,
    ){}

    async create(dto: CreateDiscountDto):Promise<DiscountResDto>  {
        const newDiscount = this.discountRepo.create(dto);
        return await this.discountRepo.save(newDiscount)
    }

    async findAll(reqDto: ListDiscountReqDto) :Promise<OffsetPaginatedDto<DiscountResDto>>  {
        const order = reqDto.order ?? Order.DESC;

        const query = this.discountRepo
            .createQueryBuilder('discounts')
            .orderBy( 'discounts.createdAt', order)

        const [discounts,metaDto] = await paginate<DiscountResDto>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(DiscountResDto, discounts), metaDto);
    }

    async findOne(id: number) :Promise<DiscountResDto>  {
        assert(id, 'id is required');
        const discount = await this.discountRepo.findOneByOrFail({id});
        return discount.toDto(DiscountResDto);
    }

    async update(id: number, dto: UpdateDiscountDto) {
        const role = await this.discountRepo.findOneByOrFail({id});
        role.title = dto.title;

        return this.discountRepo.save(role);
    }

    async remove(id: number) {
        await this.discountRepo.findOneByOrFail({id});
		await this.discountRepo.softDelete(id);
    }
}
