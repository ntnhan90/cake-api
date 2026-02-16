import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractResDto } from './dto/contract.res.dto';
import { ListContactReqDto } from '../contact/dto/list-contact.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ContractEntity } from './entities/contract.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@/constants/app.constant';
import { ListContractReqDto } from './dto/list-contract.req.dto';


@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(ContractEntity)
        private readonly contractRepo: Repository<ContractEntity>,
    ) {}

    async create(dto: CreateContractDto):Promise<ContractResDto>  {
        const newCurrency = this.contractRepo.create(dto);
        return await this.contractRepo.save(newCurrency);
    }

    async findAll(reqDto: ListContractReqDto) :Promise<OffsetPaginatedDto<ContractResDto>>{
        const order = reqDto.order ?? Order.DESC
        const query = this.contractRepo
            .createQueryBuilder('currencies')
            .orderBy( 'currencies.createdAt', order)
/*
        if (reqDto.q?.trim()) {
            query.andWhere(
            '(currencies.name LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }
            */
        const [currencies,metaDto] = await paginate<ContractEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(ContractResDto, currencies),metaDto)
    }

    async findOne(id: number) :Promise<ContractResDto> {
        assert(id, 'id is required');
        const currency = await this.contractRepo.findOneByOrFail({id});
        return currency.toDto(ContractResDto)
    }

    async update(id: number, dto: UpdateContractDto) {
        const currency = await this.contractRepo.findOneByOrFail({id})

       
        return this.contractRepo.save(currency);
    }

    async remove(id: number) {
        await this.contractRepo.findOneByOrFail({id});
		await this.contractRepo.softDelete(id);
    }
}
