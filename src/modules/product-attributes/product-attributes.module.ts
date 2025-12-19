import { Module } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesController } from './product-attributes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeEntity } from './entities/product-attribute.entity';
import { ProductAttributeSetEntity } from './entities/product-attribute-set.entity';
import { AttributeRepository } from './repo/attribute.repo';
import { AttributeSetRepository } from './repo/attribute-set.repo';
@Module({
    imports: [TypeOrmModule.forFeature([ProductAttributeEntity,ProductAttributeSetEntity])],
    controllers: [ProductAttributesController],
    providers: [ProductAttributesService,AttributeSetRepository,AttributeRepository],
})
export class ProductAttributesModule {}
