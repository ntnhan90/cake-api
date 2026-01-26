import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateAttributeSetDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ListAttributesReqDto } from './dto/list-attribute.req.dto';
import { AttributeResDto } from './dto/attributes.res.dto';
import { ProductAttributeSetEntity } from './entities/product-attribute-set.entity';
import { ProductAttributeEntity } from './entities/product-attribute.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In,Repository } from 'typeorm';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductAttributesService {
    constructor(
        @InjectRepository(ProductAttributeSetEntity)
        private readonly attrSetRepo: Repository<ProductAttributeSetEntity>,

        @InjectRepository(ProductAttributeEntity)
        private readonly attrRepo: Repository<ProductAttributeEntity>,

    ){}

    async create(dto: CreateAttributeSetDto) {
        const attributeSet = this.attrSetRepo.create({
            name: dto.name,
            status: dto.status,
        });

        const savedSet = await this.attrSetRepo.save(attributeSet);

        // 2. Guard: tránh lỗi map undefined
        if (!dto.attributes || !Array.isArray(dto.attributes)) {
            return savedSet;
        }

        // 3. Create attributes (CHÚ Ý CÚ PHÁP)
        const attributes: ProductAttributeEntity[] = dto.attributes.map(
        (attr): ProductAttributeEntity =>
            this.attrRepo.create({
            title: attr.title,
            color: attr.color ?? null,
            image: attr.image ?? null,
            attributeSet: savedSet, // ✅ BẮT BUỘC
            }),
        );

        console.log('DTO ATTRIBUTES:', dto.attributes);
        console.log('CREATED ATTRS:', attributes);
        // 4. SAVE THÌ MỚI INSERT DB
        await this.attrRepo.save(attributes);
                
        return savedSet;
    }

    async findAll(reqDto: ListAttributesReqDto):Promise<OffsetPaginatedDto<AttributeResDto>> {
        const query = this.attrSetRepo.createQueryBuilder('product_attribute_sets').orderBy(
            'product_attribute_sets.createdAt',
            'DESC'
        )

        const [faqs,metaDto] = await paginate<ProductAttributeSetEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(AttributeResDto, faqs),metaDto)
    }

    async findOne(id: number) {
        const attributeSet = await this.attrSetRepo.findOne({
            where: { id },
            relations: {
                attributes: true,
            },
        });

        if (!attributeSet) {
            throw new NotFoundException('Attribute set not found');
        }

        return attributeSet;
    }

    async update(id: number, dto: CreateAttributeSetDto) {
        const attributeSet = await this.attrSetRepo.findOne({
            where: { id },
            relations: { attributes: true },
        });

         if (!attributeSet) {
            throw new NotFoundException('Attribute set not found');
        }

        attributeSet.name = dto.name;
        attributeSet.status = dto.status;
        await this.attrSetRepo.save(attributeSet);

        if(dto.attributes &&  Array.isArray(dto.attributes)){
            // xoá attributes cũ
            if (attributeSet.attributes?.length) {
                await this.attrRepo.remove(attributeSet.attributes);
            }
            // tạo attributes mới
            const newAttributes = dto.attributes.map(attr =>
                this.attrRepo.create({
                    title: attr.title,
                    color: attr.color ?? null,
                    image: attr.image ?? null,
                    attributeSet,
                }),
            );
            await this.attrRepo.save(newAttributes);
        }
        return this.findOne(id)
    }

    async remove(id: number) {
        const attributeSet = await this.attrSetRepo.findOne({
            where: { id },
            relations: { attributes: true },
        });

        if (!attributeSet) {
            throw new NotFoundException('Attribute set not found');
        }

        if (attributeSet.attributes?.length) {
            const attrIds = attributeSet.attributes.map(a => a.id);
            await this.attrRepo.softDelete(attrIds);
        }

        // 2️⃣ soft delete attribute set
        await this.attrSetRepo.softDelete(id);

        return { message: 'Attribute set soft deleted' };
    }
}
