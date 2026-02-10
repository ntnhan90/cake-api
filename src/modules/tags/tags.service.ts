import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { TagsResDto } from './dto/tags.res.dto';
import { ListTagsReqDto } from './dto/list-tags.req.dto';
import { TagEntity } from './entities/tag.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';
import { Order} from '@/constants/app.constant';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagsRepo: Repository<TagEntity>,
    ){};

    async create(dto: CreateTagDto) :Promise<TagsResDto>{
        const newTag = this.tagsRepo.create(dto);
        return await this.tagsRepo.save(newTag)
    }

    async findAll(reqDto: ListTagsReqDto) :Promise<OffsetPaginatedDto<TagsResDto>> {
        const order = reqDto.order ?? Order.DESC;

        const query = this.tagsRepo
        .createQueryBuilder('tags')
        .orderBy( 'tags.createdAt',  order  )

        if (reqDto.q?.trim()) {
            query.andWhere(
            '(tags.name LIKE :q OR tags.slug LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }

        const [tags,metaDto] = await paginate<TagEntity>(
            query, 
            reqDto,
            {
                skipCount:false,
                takeAll: false
            }
        );

        return new OffsetPaginatedDto(plainToInstance(TagsResDto, tags), metaDto);
    }

    async findOne(id: number) :Promise<TagsResDto>{
        assert(id,'id is required');
        const tag = await this.tagsRepo.findOneByOrFail({id})
        return tag.toDto(TagsResDto);
    }

    async update(id: number, dto: UpdateTagDto) {
        const tag = await this.tagsRepo.findOneByOrFail({id})
        tag.name = dto.name;
        if (dto.description !== undefined) {
            tag.description = dto.description; // có thể là null hoặc string
        }
        tag.status = dto.status;
        return this.tagsRepo.save(tag)
    }

    async remove(id: number) {
        return this.tagsRepo.findOneByOrFail({id});
        return this.tagsRepo.softDelete(id);
    }
}
