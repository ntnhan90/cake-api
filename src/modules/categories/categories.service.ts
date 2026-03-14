import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResDto } from './dto/category.res.dto';
import { ListCategoryReqDto } from './dto/list-cate.req.dto';
import { CategoryEntity } from './entities/category.entity';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';
import { CategoryWithCount } from 'src/types/category.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly cateRepo: Repository<CategoryEntity>,
    ){};

    async create(dto: CreateCategoryDto)  :Promise<CategoryResDto>{
        const newCate = this.cateRepo.create(dto);
        const saved = await this.cateRepo.save(newCate);
        return plainToInstance(CategoryResDto, saved);
    }

    async findAll(reqDto: ListCategoryReqDto)  :Promise<OffsetPaginatedDto<CategoryResDto>> {
        const query = this.cateRepo.createQueryBuilder('categories')
            .where('categories.deleted_at IS NULL')
            .orderBy('categories.createdAt','DESC')

        const [cates, metaDto] = await paginate<CategoryEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(CategoryResDto, cates), metaDto);
    }

    async findOne(id: number) :Promise<CategoryResDto>{
        assert(id, 'id is required');
        //const cate = await this.cateRepo.findOneByOrFail({id});
        const cate = await this.cateRepo.findOneOrFail({
            where: { id, deleted_at: null },
        });
        return cate.toDto(CategoryResDto);
    }

    async update(id: number, dto: UpdateCategoryDto) {
        const cate = await this.cateRepo.findOneByOrFail({id});
        cate.name = dto.name;
        cate.slug = dto.slug;
        cate.parent_id = dto.parent_id;
        cate.description = dto.description;
        cate.status = dto.status;
        cate.order = dto.order;
        cate.image = dto.image;
        cate.is_featured = dto.is_featured;
        cate.is_default = dto.is_default;
        const saved = await this.cateRepo.save(cate);

        return plainToInstance(CategoryResDto, saved);
    }

    async remove(id: number) {
        const category = await this.cateRepo.findOne({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }
      
        await this.cateRepo.softDelete(id);

        return {
            message: 'Category deleted successfully',
        };
    }

    /**
     * 
     * @param id 
     * this.cateRepo.find({
        withDeleted: true
        });
     */
    async restore(id: number) {
        await this.cateRepo.restore(id);
    }

    async getCategoryWithPostCount(): Promise<CategoryWithCount[]> {
        const rows = await this.cateRepo
            .createQueryBuilder('c')
            .leftJoin('c.posts', 'p')
            .where('c.deleted_at IS NULL')
            .select('c.id', 'id')
            .addSelect('c.name', 'name')
            .addSelect('c.parent_id', 'parent_id')
            .addSelect('c.is_featured', 'is_featured')
            .addSelect('c.is_default', 'is_default')
            .addSelect('c.image', 'image')
            .addSelect('COUNT(p.id)', 'count')
            .groupBy('c.id')
            .addGroupBy('c.parent_id')
            .orderBy('c.parent_id', 'ASC')
            .addOrderBy('c.id', 'ASC')
            .getRawMany();

        return rows.map(row => ({
            id: +row.id,
            name: row.name,
            parent_id: +row.parent_id,
            is_featured: +row.is_featured,
            is_default: +row.is_default,
            image: row.image ?? "",
            count: +row.count,
        }));
    }

}
