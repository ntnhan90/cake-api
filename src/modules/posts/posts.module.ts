import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from './entities/post.entity';
import { TagEntity } from '../tags/entities/tag.entity';
import { CategoryEntity } from '../categories/entities/category.entity';

@Module({
    imports : [TypeOrmModule.forFeature([PostEntity,TagEntity,CategoryEntity])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
