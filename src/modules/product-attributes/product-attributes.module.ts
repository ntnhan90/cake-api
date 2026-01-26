import { Module } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesController } from './product-attributes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeEntity } from './entities/product-attribute.entity';
import { ProductAttributeSetEntity } from './entities/product-attribute-set.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductAttributeEntity,ProductAttributeSetEntity])],
    controllers: [ProductAttributesController],
    providers: [ProductAttributesService],
})
export class ProductAttributesModule {}
