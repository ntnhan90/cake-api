import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from './repo/post.repo';
import { PostEntity } from './entities/post.entity';
@Module({
    imports : [TypeOrmModule.forFeature([PostEntity])],
    controllers: [PostsController],
    providers: [PostsService, PostRepository],
})
export class PostsModule {}
