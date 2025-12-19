import { Module } from '@nestjs/common';
import { ProductCollectionsService } from './product-collections.service';
import { ProductCollectionsController } from './product-collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColectionEntity } from './entities/product-collection.entity';
import { ProductColectionRepository } from './repo/proCollection.repo';

@Module({
    imports: [TypeOrmModule.forFeature([ProductColectionEntity])],
    controllers: [ProductCollectionsController],
    providers: [ProductCollectionsService,ProductColectionRepository],
})
export class ProductCollectionsModule {}
