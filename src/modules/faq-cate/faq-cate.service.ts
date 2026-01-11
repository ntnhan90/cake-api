import { Injectable } from '@nestjs/common';
import { CreateFaqCateDto } from './dto/create-faq-cate.dto';
import { UpdateFaqCateDto } from './dto/update-faq-cate.dto';
import { faqCateResDto } from './dto/faqCate.res.dto';
import { ListFaqCateReqDto } from './dto/list-faqCate.req.dto';
import { FaqCateRepository } from './repo/faqCate.repo';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { FaqCateEntity } from './entities/faq-cate.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';


@Injectable()
export class FaqCateService {
    constructor(private readonly faqCateRepo : FaqCateRepository) {}
    async create(dto: CreateFaqCateDto) :Promise<faqCateResDto> {
        const newFaqCate = this.faqCateRepo.create(dto);
        return await this.faqCateRepo.save(newFaqCate);
    }

    async findAll(reqDto:ListFaqCateReqDto ) :Promise<OffsetPaginatedDto<faqCateResDto>>{
         const query = this.faqCateRepo.createQueryBuilder('faq_categories').orderBy(
            'faq_categories.createdAt',
            'DESC'
        )

        const [faqCate,metaDto] = await paginate<FaqCateEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(faqCateResDto, faqCate),metaDto)
    }

    async findOne(id: number) :Promise<faqCateResDto> {
        assert(id, 'id is required');
        const faqCate = await this.faqCateRepo.findOneByOrFail({id});
        return faqCate.toDto(faqCateResDto)
    }

    async update(id: number, dto: UpdateFaqCateDto) {
        const faqCate = await this.faqCateRepo.findOneByOrFail({id});
        faqCate.name = dto.name;
        faqCate.order = dto.order;
        faqCate.description = dto.description;
        faqCate.status = dto.status
        return this.faqCateRepo.save(faqCate);
    }

    async remove(id: number) {
        await this.faqCateRepo.findOneByOrFail({id});
		await this.faqCateRepo.softDelete(id);
    }
}
