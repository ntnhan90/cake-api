import { Module } from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { ProductTagsController } from './product-tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTagEntity } from './entities/product-tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTagEntity])],
    controllers: [ProductTagsController],
    providers: [ProductTagsService,],
})
export class ProductTagsModule {}
