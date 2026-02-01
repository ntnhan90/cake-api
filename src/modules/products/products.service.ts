import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductTagEntity } from '../product-tags/entities/product-tag.entity';
import { ProductCategoryEntity } from '../product-categories/entities/product-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Order} from '@/constants/app.constant';
import { ProductResDto } from './dto/product.res.dto';
import { ListProductReqDto } from './dto/list-product.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepo: Repository<ProductEntity>,

        @InjectRepository(ProductTagEntity)
        private readonly proTagRepo: Repository<ProductTagEntity>,

        @InjectRepository(ProductCategoryEntity)
        private readonly proCateRepo: Repository<ProductCategoryEntity>,
    ) {}
    async create(dto: CreateProductDto): Promise<ProductResDto> {
        const newOrder = this.productsRepo.create(dto);
        return await this.productsRepo.save(newOrder);
    }

    async findAll(reqDto: ListProductReqDto) :Promise<OffsetPaginatedDto<ProductResDto>> {
        const order = reqDto.order ?? Order.DESC;
        const query = this.productsRepo
            .createQueryBuilder('products')
            .orderBy('products.createdAt', order)
            .addOrderBy('products.id', order);
        
        if (reqDto.q?.trim()) {
            query.andWhere(
            '(products.name LIKE :q OR products.slug LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }

        const [posts, metaDto] = await paginate<ProductEntity>(
            query, 
            reqDto,
            {
                skipCount: false,
                takeAll: false,
            }
        );

        return new OffsetPaginatedDto(
            plainToInstance(ProductResDto, posts),
            metaDto
        );
    }

    async findOne(id: number): Promise<ProductResDto>  {
      //  assert(id,'id is required');
        const post = await this.productsRepo.findOne({
            where: { id },
           // relations: ['tags', 'categories'],
        });
        return post.toDto(ProductResDto);
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    async remove(id: number) {
        await this.productsRepo.findOneByOrFail({ id });
        await this.productsRepo.softDelete(id);
        return true;
    }
}
