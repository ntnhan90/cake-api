import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.req.dto';
import { UpdateTaxDto } from './dto/update-tax.req.dto';
import { ListTaxReqDto } from './dto/list-tax.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { TaxResDto } from './dto/tax.res.dto';
import { TaxRepository } from './repo/tax.repo';
import { TaxEntity } from './entities/tax.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToClass } from 'class-transformer';
import assert from 'assert';

@Injectable()
export class TaxService {
    //private readonly logger = new Logger(UserService.name);
    constructor(
        private readonly taxRepo: TaxRepository,
    ){}

    async create(dto: CreateTaxDto) :Promise<TaxResDto> {
        const newTax = this.taxRepo.create(dto);
        return await this.taxRepo.save(newTax)
        //return 'This action adds a new tax';
    }

    async findAll(reqDto: ListTaxReqDto):Promise<OffsetPaginatedDto<TaxResDto>> {
        const query = this.taxRepo.createQueryBuilder('taxes').orderBy(
            'taxes.createdAt',
            'DESC'
        )

        const [taxes,metaDto] = await paginate<TaxEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToClass(TaxResDto, taxes), metaDto);
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
