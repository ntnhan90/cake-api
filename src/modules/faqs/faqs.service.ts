import { Injectable } from '@nestjs/common';
import { CreateFaqsDto } from './dto/create-faq.dto';
import { UpdateFaqsDto } from './dto/update-faq.dto';
import { FaqsResDto } from './dto/faq.res.dto';
import { ListFaqsReqDto } from './dto/list-faqs.req.dto';
import { FaqsRepository } from './repo/faq.repo';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { FaqsEntity } from './entities/faq.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToClass } from 'class-transformer';
import assert from 'assert';

@Injectable()
export class FaqsService {
    constructor(private readonly faqsRepo : FaqsRepository) {}
    async create(dto: CreateFaqsDto): Promise<FaqsResDto> {
        const newFaqs = this.faqsRepo.create(dto);
        return await this.faqsRepo.save(newFaqs);
    }

    async findAll(reqDto: ListFaqsReqDto) :Promise<OffsetPaginatedDto<FaqsResDto>> {
        const query = this.faqsRepo.createQueryBuilder('faqs').orderBy(
            'faqs.createdAt',
            'DESC'
        )

        const [faqs,metaDto] = await paginate<FaqsEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToClass(FaqsResDto, faqs),metaDto)
    }

    async findOne(id: number) : Promise<FaqsResDto>{
        assert(id, 'id is required');
        const faq = await this.faqsRepo.findOneByOrFail({id});
        return faq.toDto(FaqsResDto)
    }

    async update(id: number, dto: UpdateFaqsDto) {
        const faq = await this.faqsRepo.findOneByOrFail({id});
        faq.category_id = dto.category_id;
        faq.question = dto.question;
        faq.answer = dto.answer;
        faq.status = dto.status;
        return this.faqsRepo.save(faq);
    }

    async remove(id: number) {
        await this.faqsRepo.findOneByOrFail({id});
		await this.faqsRepo.softDelete(id);
    }
}
