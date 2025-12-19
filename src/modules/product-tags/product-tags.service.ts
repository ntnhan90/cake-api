import { Injectable } from '@nestjs/common';
import { CreateProductTagDto } from './dto/create-product-tag.req.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.req.dto';
import { ProductTagsRepository } from './repo/product-tag.repo';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ListTagsReqDto } from './dto/list-tag.req.dto';
import { TagsResDto } from './dto/tag.res.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { ProductTagEntity } from './entities/product-tag.entity';
import assert from 'assert';
@Injectable()
export class ProductTagsService {
    constructor(private readonly proTagsRepo : ProductTagsRepository){};

    async create(dto: CreateProductTagDto) :Promise<TagsResDto>{
        const newTag = this.proTagsRepo.create(dto);
        return await this.proTagsRepo.save(newTag)
    }

    async findAll(reqDto: ListTagsReqDto):Promise<OffsetPaginatedDto<TagsResDto>> {
        const query = this.proTagsRepo.createQueryBuilder('product_tags').orderBy(
            'product_tags.createdAt',
            'DESC'
        )

        const [tags, metaDto] = await paginate<ProductTagEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(TagsResDto, tags), metaDto);
    }

    async findOne(id: number):Promise<TagsResDto> {
        assert(id, 'id is required');
        const tag = await this.proTagsRepo.findOneByOrFail({id});
        return  tag.toDto(TagsResDto)
    }

    async update(id: number, dto: UpdateProductTagDto) {
        const tag = await this.proTagsRepo.findOneByOrFail({id});
        tag.name = dto.name;
        tag.description = dto.description;
        tag.status = dto.status;
        
        return `This action updates a #${id} productTag`;
    }

    async remove(id: number) {
        return this.proTagsRepo.findOneByOrFail({id});
        return this.proTagsRepo.softDelete(id);
    }
}
