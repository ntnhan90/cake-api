import { Injectable } from '@nestjs/common';
import { CreateProductTagDto } from './dto/create-product-tag.req.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.req.dto';
import { ProductTagsRepository } from './repo/product-tag.repo';
import { ListTagsReqDto } from './dto/list-tag.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { TagsResDto } from './dto/tag.res.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { ProductTagEntity } from './entities/product-tag.entity';
@Injectable()
export class ProductTagsService {
    constructor(private readonly proTagsRepository : ProductTagsRepository){};

    create(createProductTagDto: CreateProductTagDto) {
      return 'This action adds a new productTag';
    }

    async findAll(reqDto: ListTagsReqDto):Promise<OffsetPaginatedDto<TagsResDto>> {
        const query= this.proTagsRepository.createQueryBuilder('product_tags')
        const [tags, metaDto] = await paginate<ProductTagEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(TagsResDto, tags), metaDto);
    }

    findOne(id: number) {
      return `This action returns a #${id} productTag`;
    }

    update(id: number, updateProductTagDto: UpdateProductTagDto) {
      return `This action updates a #${id} productTag`;
    }

    remove(id: number) {
      return `This action removes a #${id} productTag`;
    }
}
