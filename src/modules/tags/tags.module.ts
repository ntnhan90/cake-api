import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TagRepository } from './repo/tag.repo';

@Module({
    imports:[TypeOrmModule.forFeature([TagEntity])],
    controllers: [TagsController],
    providers: [TagsService, TagRepository],
    exports: [TagRepository]
})
export class TagsModule {}
