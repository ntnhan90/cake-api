import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repo/post.repo';
import { PostResDto } from './dto/post.res.dto';
import { ListPostsReqDto } from './dto/list-posts.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { PostEntity } from './entities/post.entity';
import assert from 'assert';

@Injectable()
export class PostsService {
    constructor(private readonly postRepo : PostRepository){};
    async create(dto: CreatePostDto): Promise<PostResDto>{
        const post = this.postRepo.create(dto);
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
        const post = await this.postRepo.findOneByOrFail({id})
        post.name = dto.name;
        if (dto.description !== undefined) {
            post.description = dto.description; // có thể là null hoặc string
        }
        post.status = dto.status;
        return this.postRepo.save(post)
    }

    async remove(id: number) {
        return this.postRepo.findOneByOrFail({id});
        return this.postRepo.softDelete(id);
    }
}
