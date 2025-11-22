import { Module } from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { ProductTagsController } from './product-tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTagEntity } from './entities/product-tag.entity';
import { ProductTagsRepository } from './repo/product-tag.repo';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTagEntity])],
    controllers: [ProductTagsController],
    providers: [ProductTagsService,ProductTagsRepository],
})
export class ProductTagsModule {}
