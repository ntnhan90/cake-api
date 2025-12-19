import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ListProductCateReqDto } from './dto/list-cate.req.dto';
import { ProductCateResDto } from './dto/cate.res.dto';
import { ProductCategoryRepository } from './repo/product-category.repo';
import { ProductCategoryEntity } from './entities/product-category.entity';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToClass } from 'class-transformer';

import assert from 'assert';
@Injectable()
export class ProductCategoriesService {
    constructor(private readonly proCateRepo : ProductCategoryRepository){}
    async create(dto: CreateProductCategoryDto):Promise<ProductCateResDto> {
        const newCate = this.proCateRepo.create(dto);
        return await this.proCateRepo.save(newCate);
    }

    async findAll(reqDto: ListProductCateReqDto): Promise<OffsetPaginatedDto<ProductCateResDto>> {
        const query = this.proCateRepo.createQueryBuilder('product_categories').orderBy(
            'product_categories.createdAt',
            'DESC'
        )

        const [taxes,metaDto] = await paginate<ProductCategoryEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToClass(ProductCateResDto, taxes), metaDto);
    }

    async findOne(id: number):Promise<ProductCateResDto> {
        assert(id,'id is required');
        const proCate = await this.proCateRepo.findOneByOrFail({id})
        return proCate.toDto(ProductCateResDto);
    }

    async update(id: number, dto: UpdateProductCategoryDto) {
        assert(id,'id is required');
        const proCate = await this.proCateRepo.findOneByOrFail({id})
        proCate.name = dto.name;
        proCate.slug = dto.slug;
        proCate.parent_id = dto.parent_id;
        proCate.description = dto.description;
        proCate.status = dto.status;
        proCate.order = dto.order;
        proCate.image = dto.image;
        proCate.is_featured = dto.is_featured;
        return this.proCateRepo.save(proCate)
    }

    async remove(id: number) {
       await this.proCateRepo.findOneByOrFail({id});
		await this.proCateRepo.softDelete(id);
    }
}
