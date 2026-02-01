import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductTagEntity } from '../product-tags/entities/product-tag.entity';
import { ProductCategoryEntity } from '../product-categories/entities/product-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity,ProductTagEntity,ProductCategoryEntity])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
