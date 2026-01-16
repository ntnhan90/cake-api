import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from './repo/post.repo';
import { PostEntity } from './entities/post.entity';
import { TagEntity } from '../tags/entities/tag.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { PostCategoryEntity } from './entities/post_categories.entity';

@Module({
    imports : [TypeOrmModule.forFeature([PostEntity,TagEntity,CategoryEntity,PostCategoryEntity])],
    controllers: [PostsController],
    providers: [PostsService, PostRepository],
})
export class PostsModule {}
