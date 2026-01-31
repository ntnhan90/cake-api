import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.req.dto';
import { UpdateTaxDto } from './dto/update-tax.req.dto';
import { ListTaxReqDto } from './dto/list-tax.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { TaxResDto } from './dto/tax.res.dto';
import { TaxRepository } from './repo/tax.repo';
import { TaxEntity } from './entities/tax.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Order} from '@/constants/app.constant';

@Injectable()
export class TaxService {
    //private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(TaxEntity)
        private readonly taxRepo: Repository<TaxEntity>,
    ){};

    async create(dto: CreateTaxDto) :Promise<TaxResDto> {
        const newTax = this.taxRepo.create(dto);
        return await this.taxRepo.save(newTax)
    }

    async findAll(reqDto: ListTaxReqDto):Promise<OffsetPaginatedDto<TaxResDto>> {
        const order = reqDto.order ?? Order.DESC;
        const query = this.taxRepo
            .createQueryBuilder('taxes')
            .orderBy( 'taxes.createdAt',  order )

        const [taxes,metaDto] = await paginate<TaxEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(TaxResDto, taxes), metaDto);
    }

    async findOne(id: number): Promise<TaxResDto> {
        assert(id, 'id is required');
        const tax = await this.taxRepo.findOneByOrFail({id});
        return tax.toDto(TaxResDto);
    }

    async update(id: number, dto: UpdateTaxDto) {
        const tax = await this.taxRepo.findOneByOrFail({id});
       
        tax.title = dto.title;
        tax.status = dto.status;
        tax.percentage = dto.percentage;
        return this.taxRepo.save(tax);
    }

    async remove(id: number) {
        await this.taxRepo.findOneByOrFail({id});
		await this.taxRepo.softDelete(id);
    }

 
}
