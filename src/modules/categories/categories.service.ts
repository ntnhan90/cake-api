import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repo/category.repo';
import { CategoryResDto } from './dto/category.res.dto';
import { ListCategoryReqDto } from './dto/list-cate.req.dto';
import { CategoryEntity } from './entities/category.entity';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';
import { CategoryWithCount } from 'src/types/category.type';


@Injectable()
export class CategoriesService {
    constructor(private readonly cateRepo : CategoryRepository){};
    async create(dto: CreateCategoryDto)  :Promise<CategoryResDto>{
        const newCate = this.cateRepo.create(dto);
        return await this.cateRepo.save(newCate)
    }

    async findAll(reqDto: ListCategoryReqDto)  :Promise<OffsetPaginatedDto<CategoryResDto>> {
       const query = this.cateRepo.createQueryBuilder('categories').orderBy(
            'categories.createdAt',
            'DESC'
        )

        const [cates, metaDto] = await paginate<CategoryEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(CategoryResDto, cates), metaDto);
    }

    async findOne(id: number) :Promise<CategoryResDto>{
        assert(id, 'id is required');
        const cate = await this.cateRepo.findOneByOrFail({id});
        
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
        return this.cateRepo.save(cate);
    }

    async remove(id: number) {
        return this.cateRepo.findOneByOrFail({id});
        return this.cateRepo.softDelete(id);
    }

    async getCategoryWithPostCount(): Promise<CategoryWithCount[]> {
        const rows = await this.cateRepo
            .createQueryBuilder('c')
            .leftJoin('c.posts', 'p')
            .select([
                'c.id AS id',
                'c.name AS name',
                'c.parent_id AS parent_id',
                'c.is_featured AS is_featured',
                'COUNT(p.id) AS count',
            ])
            .groupBy('c.id')
            .addGroupBy('c.name')
            .addGroupBy('c.parent_id')
            .orderBy('c.parent_id', 'ASC')
            .addOrderBy('c.id', 'ASC')
            .getRawMany();
        
        return rows.map(row =>({
            id: Number(row.id),
            name: row.name,
            parent_id: Number(row.parent_id),
            is_featured: Number(row.is_featured),
            count: Number(row.count),
        }));
    }

}
