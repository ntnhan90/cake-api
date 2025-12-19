import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CurrencyResDto} from './dto/currency.res.dto';
import { ListCurrencyReqDto } from './dto/list-currency.req.dto';
import { CurrencyRepository } from './repo/currencies.repo';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { CurrencyEntity } from './entities/currency.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToClass } from 'class-transformer';
import assert from 'assert';

@Injectable()
export class CurrenciesService {
    constructor(private readonly currencyRepo : CurrencyRepository) {}

    async create(dto: CreateCurrencyDto):Promise<CurrencyResDto> {
        const newCurrency = this.currencyRepo.create(dto);
        return await this.currencyRepo.save(newCurrency);
    }

    async findAll(reqDto: ListCurrencyReqDto) :Promise<OffsetPaginatedDto<CurrencyResDto>>{
        const query = this.currencyRepo.createQueryBuilder('currencies').orderBy(
            'currencies.createdAt',
            'DESC'
        )

        const [currencies,metaDto] = await paginate<CurrencyEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToClass(CurrencyResDto, currencies),metaDto)
    }

    async findOne(id: number):Promise<CurrencyResDto> {
        assert(id, 'id is required');
        const currency = await this.currencyRepo.findOneByOrFail({id});
        return currency.toDto(CurrencyResDto)
    }

    async update(id: number, dto: UpdateCurrencyDto) {
        const currency = await this.currencyRepo.findOneByOrFail({id})

        currency.title = dto.title;
        currency.is_prefix_symbol = dto.is_prefix_symbol;
        currency.decimals = dto.decimals;
        currency.default = dto.default;
        currency.exchange_rate= dto.exchange_rate;
        return this.currencyRepo.save(currency);
    }

    async remove(id: number) {
        await this.currencyRepo.findOneByOrFail({id});
		await this.currencyRepo.softDelete(id);
    }
}
