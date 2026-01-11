import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './repo/category.repo';

@Module({
    imports : [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
