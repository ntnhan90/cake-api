import { Injectable } from '@nestjs/common';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

import { AttributeSetRepository } from './repo/attribute-set.repo';
import { AttributeRepository } from './repo/attribute.repo';

@Injectable()
export class ProductAttributesService {
    constructor(
        private readonly attrSetRepo: AttributeSetRepository,
        private readonly attrRepo: AttributeRepository,
    ){}

    create(createProductAttributeDto: CreateProductAttributeDto) {
        return 'This action adds a new productAttribute';
    }

    findAll() {
        return `This action returns all productAttributes`;
    }

    findOne(id: number) {
        return `This action returns a #${id} productAttribute`;
    }

    update(id: number, updateProductAttributeDto: UpdateProductAttributeDto) {
        return `This action updates a #${id} productAttribute`;
    }

    async remove(id: number) {
        return `This action removes a #${id} productAttribute`;
    }
}
