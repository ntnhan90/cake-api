import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateAttributeSetDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { AttributeSetRepository } from './repo/attribute-set.repo';
import { AttributeRepository } from './repo/attribute.repo';
import { ProductAttributeSetEntity } from './entities/product-attribute-set.entity';
import { ProductAttributeEntity } from './entities/product-attribute.entity';

@Injectable()
export class ProductAttributesService {
    constructor(
        private readonly attrSetRepo: AttributeSetRepository,
        private readonly attrRepo: AttributeRepository,
    ){}

    async create(dto: CreateAttributeSetDto) {
        return this.attrSetRepo.manager.transaction(async manager =>{
            const { attributes, ...setData } = dto;
            // 1 create attribute set
            const attributeSet = await manager.save(
                manager.create(ProductAttributeSetEntity, setData),
            );

            // 2 create attributes (nếu có)
            if(attributes?.length){
                const attrEntities = attributes.map(attr =>
                    manager.create(ProductAttributeEntity,{
                        ...attr,
                        attribute_set_id: attributeSet.id
                    })
                );

                await manager.save(ProductAttributeEntity, attrEntities)
            }
            // 3 load lại để trả response
            return manager.findOne(ProductAttributeSetEntity, {
                where: { id: attributeSet.id },
                relations: ['attributes'],
            });
        })
    }

    async findAll() {
        const sets = await this.attrSetRepo.createQueryBuilder('product_attribute_sets')
            .leftJoinAndSelect('product_attribute_sets.attributes', 'attributes')
        //    .where('product_attribute_sets.deleted_at IS NULL')
        //    .andWhere('attributes.deleted_at IS NULL')
            .orderBy('product_attribute_sets.id', 'DESC')
            .addOrderBy('attributes.order', 'ASC')
            .getMany();
        return sets;
    }

    async findOne(id: number) {
        const set = await this.attrSetRepo.findOne({
            where: { id },
                relations: ['attributes'],
            });

            if (!set) {
                throw new NotFoundException('Attribute set not found');
            }

            return set;
    }

    update(id: number, dto: CreateAttributeSetDto) {
        const { attributes, ...setData } = dto;

        return this.attrSetRepo.manager.transaction(async manager => {
            await manager.update(ProductAttributeSetEntity, id, setData);

            if(attributes){
                // xoá attribute cũ
                await manager.delete(ProductAttributeEntity, {
                    attribute_set_id: id,
                });

                // insert lại
                if(attributes.length){
                    await manager.save(
                        ProductAttributeEntity,
                        attributes.map(attr => ({
                            ...attr,
                            attribute_set_id: id,
                        }))
                    )
                }
            }

            return manager.findOne(ProductAttributeSetEntity,{
                where: {id},
                relations: ['attributes'],
            });
        });
    }

    async remove(id: number) {
        const set = await this.attrSetRepo.findOne({
            where: { id },
        });

        if (!set) {
            throw new NotFoundException('Attribute set not found');
        }

        // 1️⃣ soft delete attributes
        await this.attrRepo.softDelete({
            attribute_set_id: id,
        });

        // 2️⃣ soft delete attribute set
        await this.attrSetRepo.softDelete(id);

        return true;
    }
}
