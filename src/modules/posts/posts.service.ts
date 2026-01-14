import { Injectable,NotFoundException } from '@nestjs/common';
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

    async create(dto: CreatePostDto): Promise<PostResDto>{
        const {categories, tags, ...postData } = dto;

        const post = this.postRepo.create(postData);
        if (tags?.length) {
            post.tags = await this.resolveTags(tags);
        }

        if (categories?.length) {
            post.categories = await this.cateRepo.find({
                where: { id: In(categories) },
            });
        }
                const savedPost = await this.postRepo.save(post);
        return {
            id: savedPost.id,
            name: savedPost.name,
            slug: savedPost.slug,
            description: savedPost.description,
            content: savedPost.content,
            user_id: savedPost.user_id,
            is_featured: savedPost.is_featured,
            views: savedPost.views,
            image: savedPost.image,
            status: savedPost.status,
            tags: savedPost.tags?.map(tag => ({
                tag_id: tag.id,
                tag_name: tag.name,
            })) ?? [],
        };
    }

    async findAll(reqDto: ListPostsReqDto) :Promise<OffsetPaginatedDto<PostResDto>> {
        const query = this.postRepo.createQueryBuilder('product_tags').orderBy(
            'product_tags.createdAt',
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
        const post = await this.postRepo.findOneByOrFail({id})
        return post.toDto(PostResDto);
    }

    async update(id: number, dto: UpdatePostDto) {
        const post = await this.postRepo.findOne({
            where: { id },
            relations: ['tags'],
        });
        

        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const {categories, tags, ...postData } = dto;
        // update field thường
        Object.assign(post, postData);
        // nếu có tags -> sync lại post_tags
        if (tags) {
            post.tags = await this.resolveTags(tags);
        }

        if (categories) {
            post.categories = categories.length
            ? await this.cateRepo.find({
                where: { id: In(categories) },
                })
            : [];
        }

        return this.postRepo.save(post)
    }

    async remove(id: number) {
        return this.postRepo.findOneByOrFail({id});
        return this.postRepo.softDelete(id);
    }
}
