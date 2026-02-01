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
import { In,Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import {Order} from '@/constants/app.constant';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,

        @InjectRepository(TagEntity)
        private readonly tagRepo: Repository<TagEntity>,

        @InjectRepository(CategoryEntity)
        private readonly cateRepo: Repository<CategoryEntity>,
    ){};

    private readonly logger = new Logger(PostsService.name);
    /* =====================================================
     HELPER: xử lý tags string[] -> TagEntity[]
     ===================================================== */
    private async resolveTags(tagNames?: string[]): Promise<TagEntity[]> {
        if (!tagNames || tagNames.length === 0) return [];

        // normalize + unique name input
        const names = [
            ...new Set(
            tagNames
                .filter(Boolean)
                .map(n => n.trim())
                .filter(Boolean),
            ),
        ];

        if (!names.length) return [];

        // generate base slug từ name
        const baseSlugs = names.map(name => this.slugify(name));

        // tìm các tag đã tồn tại theo slug
        const existingTags = await this.tagRepo.find({
            where: { slug: In(baseSlugs) },
        });

        const existingSlugs = existingTags.map(t => t.slug);

        const newTags: TagEntity[] = [];

        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const baseSlug = baseSlugs[i];

            // nếu slug đã tồn tại → skip (reuse tag)
            if (existingSlugs.includes(baseSlug)) {
                continue;
            }

            const uniqueSlug = await this.generateUniqueSlug(baseSlug);

            newTags.push(
                this.tagRepo.create({
                    name,
                    slug: uniqueSlug,
                }),
            );
        }

        if (newTags.length) {
            await this.tagRepo.save(newTags);
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
            await this.tagRepo.exist({
            where: { slug },
            })
        ) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        return slug;
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
        const order = reqDto.order ?? Order.DESC;

        const query = this.postRepo
            .createQueryBuilder('posts')
            .leftJoinAndSelect('posts.tags', 'tags')
            .leftJoinAndSelect('posts.categories', 'categories')
            .orderBy('posts.createdAt', order)
            .addOrderBy('posts.id', order);

        if (reqDto.q?.trim()) {
            query.andWhere(
            '(posts.name LIKE :q OR posts.slug LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }

        const [posts, metaDto] = await paginate<PostEntity>(
            query, 
            reqDto,
            {
                skipCount: false,
                takeAll: false,
            }
        );

        return new OffsetPaginatedDto(
            plainToInstance(PostResDto, posts),
            metaDto
        );
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
        if(categories || tags){
            const post = await this.postRepo.findOne({
                where: { id },
                relations: ['categories', 'tags'],
            });

            if (!post) {
                throw new NotFoundException('Post not found');
            }

            if (categories !== undefined) {
                post.categories = categories.length
                ? await this.cateRepo.findBy({
                    id: In(categories),
                })
                : [];
            }

            if (tags !== undefined) {
                post.tags = tags.length
                ? await this.resolveTags(tags)
                : [];
            }

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
