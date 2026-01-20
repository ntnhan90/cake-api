import { Injectable,NotFoundException ,InternalServerErrorException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResDto } from './dto/post.res.dto';
import { ListPostsReqDto } from './dto/list-posts.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { PostEntity } from './entities/post.entity';
import assert from 'assert';
import { TagEntity } from '../tags/entities/tag.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
//import { PostCategoryEntity } from './entities/post_categories.entity';
import { In,Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,

        @InjectRepository(TagEntity)
        private readonly tagRepo: Repository<TagEntity>,

        @InjectRepository(CategoryEntity)
        private readonly cateRepo: Repository<CategoryEntity>,
        
   //     @InjectRepository(PostCategoryEntity)
   //     private readonly postCategoryRepo: Repository<PostCategoryEntity>,
    ){};
    /* =====================================================
     HELPER: xử lý tags string[] -> TagEntity[]
     ===================================================== */
    private async resolveTags(tagNames?: string[]): Promise<TagEntity[]> {
        if (!tagNames || tagNames.length === 0) return [];

        // unique + trim
        const names = [...new Set(tagNames.map(t => t.trim()))];

        // tags đã tồn tại
        const existingTags = await this.tagRepo.find({
            where: { name: In(names) },
        });

        const existingNames = existingTags.map(t => t.name);

        // tags mới
        const newTags = names
        .filter(name => !existingNames.includes(name))
        .map(name => this.tagRepo.create({ name }));

        if (newTags.length) {
            await this.tagRepo.save(newTags);
        }

        return [...existingTags, ...newTags];
    }

    async create(dto: CreatePostDto): Promise<PostResDto> {
        return this.postRepo.manager.transaction(async manager => {

            const { categories, tags, ...postData } = dto;

            /* ------------------ VALIDATE CATEGORY ------------------ */
            let categoryEntities: CategoryEntity[] = [];

            if (categories?.length) {
            categoryEntities = await manager.findBy(CategoryEntity, {
                id: In(categories),
            });

            if (categoryEntities.length !== categories.length) {
                throw new NotFoundException('Category not found');
            }
            }

            /* ------------------ CREATE POST ------------------ */
            const post = manager.create(PostEntity, {
            ...postData,
            categories: categoryEntities, // 🔥 GÁN TRỰC TIẾP
            });

            await manager.save(post);

            /* ------------------ TAGS ------------------ */
            if (tags?.length) {
            const tagEntities = await this.resolveTags(tags);
            post.tags = tagEntities;
            await manager.save(post);
            }

            return post.toDto(PostResDto);
        });
    }

    async findAll(reqDto: ListPostsReqDto) :Promise<OffsetPaginatedDto<PostResDto>> {
        const query = this.postRepo.createQueryBuilder('posts').orderBy(
            'posts.createdAt',
            'DESC'
        )
        const [posts, metaDto] = await paginate<PostEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(PostResDto, posts), metaDto);
    }

    async findOne(id: number)  :Promise<PostResDto>{
        assert(id,'id is required');
        const post = await this.postRepo.findOne({
            where: { id },
            relations: ['tags', 'categories'],
        });
        return post.toDto(PostResDto);
    }

    async update(id: number, dto: UpdatePostDto) {
        
        const { categories, tags, ...postData } = dto;

        await this.postRepo.update(id, postData);

        // ===== SYNC CATEGORIES =====

        // ===== SYNC TAGS =====
        if (tags) {
            const post = await this.postRepo.findOne({
                where: { id },
                relations: ['tags'],
            });

            post.tags = await this.resolveTags(tags);
            await this.postRepo.save(post);
        }
        return true
    }

    async remove(id: number) {
        await this.postRepo.findOneByOrFail({ id });
        await this.postRepo.softDelete(id);
        return true;
    }
}
