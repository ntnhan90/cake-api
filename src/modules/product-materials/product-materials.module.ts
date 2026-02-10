import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMaterialsService } from './product-materials.service';
import { ProductMaterialsController } from './product-materials.controller';
import { ProductMaterialEntity } from './entities/product-material.entity';

@Module({
    imports : [TypeOrmModule.forFeature([ProductMaterialEntity])],
    controllers: [ProductMaterialsController],
    providers: [ProductMaterialsService],
})
export class ProductMaterialsModule {}
