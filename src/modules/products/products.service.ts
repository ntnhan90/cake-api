import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductTagEntity } from '../product-tags/entities/product-tag.entity';
import { ProductCategoryEntity } from '../product-categories/entities/product-category.entity';
import { In,Repository } from 'typeorm';
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

    private async resolveTags(tagNames?: string[]): Promise<ProductTagEntity[]> {
        if (!tagNames?.length) return [];

        const names = [...new Set(
            tagNames.map(n => n?.trim()).filter(Boolean)
        )];

        if (!names.length) return [];

        const baseSlugs = names.map(n => this.slugify(n));

        const existingTags = await this.proTagRepo.find({
            where: { slug: In(baseSlugs) },
        });

        const slugSet = new Set(existingTags.map(t => t.slug));
        const newTags: ProductTagEntity[] = [];

        for (const [i, name] of names.entries()) {
            const baseSlug = baseSlugs[i];

            if (slugSet.has(baseSlug)) continue;

            const uniqueSlug = await this.generateUniqueSlug(baseSlug);

            newTags.push(
                this.proTagRepo.create({ name, slug: uniqueSlug }),
            );

            slugSet.add(uniqueSlug);
        }

        if (newTags.length) {
            await this.proTagRepo.save(newTags);
        }

        return [...existingTags, ...newTags];
    }

    private slugify(text: string): string {
        return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // bỏ ký tự đặc biệt
        .replace(/\s+/g, '-')     // space → -
        .replace(/-+/g, '-');     // gộp --
    }

    private async generateUniqueSlug(baseSlug: string): Promise<string> {
        let slug = baseSlug;
        let counter = 1;

        while (
            await this.proTagRepo.exist({
            where: { slug },
            })
        ) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        return slug;
    }

    async create(dto: CreateProductDto): Promise<ProductResDto> {
        const { categories, tags, ...productData } = dto
        /** 1 Categories */
        let categoryEntities: ProductCategoryEntity[] = []
        if (categories?.length) {
            categoryEntities = await this.proCateRepo.find({
                where: { id: In(categories) },
            })
        }

        /** 2️ Tags (string -> entity) */
        let tagEntities: ProductTagEntity[] = []
        if(tags?.length){
            tagEntities = await this.resolveTags(tags);
        }

        /** Create product */
        const product = this.productsRepo.create({
            ...productData,
            categories: categoryEntities,
            tags: tagEntities,
        })

        return this.productsRepo.save(product)
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
            relations: ['tags', 'categories'],
        });
        return post.toDto(ProductResDto);
    }

    async update(id: number, dto: UpdateProductDto) {
        const product = await this.productsRepo.findOne({
            where: {id},
            relations: ['categories' , 'tags' ]
        })

        if(!product){
            throw new NotFoundException('Product no found')
        }

        const { categories, tags, ...productData } = dto;
         /** 2. Categories */
        let categoryEntities = product.categories;
        if (categories) {
            categoryEntities = categories.length
            ? await this.proCateRepo.find({
                where: { id: In(categories) },
                })
            : [];
        }

        /** 3. Tags */
        let tagEntities = product.tags;
        if (tags) {
            tagEntities = tags.length
            ? await this.resolveTags(tags)
            : [];
        }

        /** 4. Merge & save */
        Object.assign(product, {
            ...productData,
            categories: categoryEntities,
            tags: tagEntities,
        });

        return this.productsRepo.save(product);
    }

    async remove(id: number) {
        await this.productsRepo.findOneByOrFail({ id });
        await this.productsRepo.softDelete(id);
        return true;
    }
}
