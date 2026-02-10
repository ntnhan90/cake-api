import { Injectable } from '@nestjs/common';
import { CreateProductMaterialDto } from './dto/create-product-material.dto';
import { UpdateProductMaterialDto } from './dto/update-product-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMaterialEntity } from './entities/product-material.entity';
import { Repository } from 'typeorm';
import { MaterialResDto } from './dto/material.res.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import assert from 'assert';
import { ListMaterialReqDto } from './dto/list-material.req.dto';
import {Order} from '@/constants/app.constant';


@Injectable()
export class ProductMaterialsService {
    constructor(
        @InjectRepository(ProductMaterialEntity)
        private readonly materialRepo: Repository<ProductMaterialEntity>,
    ){}

    async create(dto: CreateProductMaterialDto) : Promise<MaterialResDto>{
        const newFaqs = this.materialRepo.create(dto);
        return await this.materialRepo.save(newFaqs);
        //return 'This action adds a new productMaterial';
    }

    async findAll(reqDto: ListMaterialReqDto) :Promise<OffsetPaginatedDto<MaterialResDto>> {
        const order = reqDto.order ?? Order.DESC;

        const query = this.materialRepo
            .createQueryBuilder('product_materials')
            .orderBy('product_materials.createdAt', order)
            .addOrderBy('product_materials.id', order);

        if (reqDto.q?.trim()) {
            query.andWhere(
            '(product_materials.name LIKE :q )',
            { q: `%${reqDto.q.trim()}%` }
            );
        }

        const [materials, metaDto] = await paginate<ProductMaterialEntity>(
            query, 
            reqDto,
            {
                skipCount: false,
                takeAll: false,
            }
        );

        return new OffsetPaginatedDto(
            plainToInstance(MaterialResDto, materials),
            metaDto
        );
    }

    async findOne(id: number):Promise<MaterialResDto> {
        assert(id,'id is required');
        const post = await this.materialRepo.findOne({
            where: { id },
        });
        return post.toDto(MaterialResDto);
    }

    async update(id: number, dto: UpdateProductMaterialDto) {
        const material = await this.materialRepo.findOne({
            where: { id },
        });
        material.name = dto.name;
        material.sku = dto.sku;
        material.unit = dto.unit;
        material.category = dto.category;
        material.cost_price = dto.cost_price;
        material.status = dto.cost_price;
        return `This action updates a #${id} productMaterial`;
    }

    async remove(id: number) {
        await this.materialRepo.findOneByOrFail({id});
		await this.materialRepo.softDelete(id);
    }
}
