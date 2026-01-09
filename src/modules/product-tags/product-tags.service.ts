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
import slugify from 'slugify';
import { BadRequestException } from '@nestjs/common';
import { Not } from 'typeorm';

@Injectable()
export class ProductTagsService {
    constructor(private readonly proTagsRepo : ProductTagsRepository){};

    async create(dto: CreateProductTagDto) :Promise<TagsResDto>{
        const exists = await this.isNameExists(dto.name)
        if (exists) {
            throw new BadRequestException('Tag name đã tồn tại')
        }
        const newTag = this.proTagsRepo.create(dto);
        try {
            return await this.proTagsRepo.save(newTag)
        } catch (err: any) {
            // fallback chống race condition
            if (err.code === 'ER_DUP_ENTRY') {
                throw new BadRequestException('Tag name đã tồn tại')
            }
            throw err
        }
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
        if (dto.description !== undefined) {
            tag.description = dto.description; // có thể là null hoặc string
        }
        tag.status = dto.status;
        
        return this.proTagsRepo.save(tag)
    }

    async remove(id: number) {
        return this.proTagsRepo.findOneByOrFail({id});
        return this.proTagsRepo.softDelete(id);
    }

    async isSlugExists(slug:string) :Promise<boolean>{
        const count = await this.proTagsRepo.count({
            where: {slug},
        })
        return count > 0;
    }

    async findSimilarSlugs( baseSlug: string) : Promise<string[]>{
        const rows = await this.proTagsRepo
            .createQueryBuilder('product_tags')
            .select('product_tags.slug')
            .where('product_tags.slug = :base', { base: baseSlug })
            .orWhere('product_tags.slug LIKE :like', {
                like: `${baseSlug}-%`,
            })
            .getRawMany()

        return rows.map((r) => r.post_slug)
    }

    async generateUniqueSlug(title: string): Promise<string> {
        const baseSlug = slugify(title)
        const slugs = await this.findSimilarSlugs(baseSlug)

        if (!slugs.includes(baseSlug)) return baseSlug

        let max = 0
        slugs.forEach((s) => {
            const match = s.match(new RegExp(`^${baseSlug}-(\\d+)$`))
            if (match) {
            max = Math.max(max, Number(match[1]))
            }
        })

        return `${baseSlug}-${max + 1}`
    }

    async isNameExists(name: string): Promise<boolean> {
        const count = await this.proTagsRepo.count({
            where: { name },
        })
        return count > 0
    }

    async isNameExistsForUpdate(name: string, id: number): Promise<boolean> {
        const count = await this.proTagsRepo.count({
            where: {
            name,
            id: Not(id),
            },
        })
        return count > 0
    }

}
