import { Injectable } from '@nestjs/common';
import { CreateProductCollectionDto } from './dto/create-product-collection.dto';
import { UpdateProductCollectionDto } from './dto/update-product-collection.dto';
import { ListCollectionReqDto } from './dto/list-collection.req.dto';
import { CollectionResDto } from './dto/collection.res.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ProductColectionRepository } from './repo/proCollection.repo';
import { ProductColectionEntity } from './entities/product-collection.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToClass } from 'class-transformer';
import assert from 'assert';

@Injectable()
export class ProductCollectionsService {
    constructor(private readonly collectionRepo: ProductColectionRepository){}

    async create(dto: CreateProductCollectionDto) :Promise<CollectionResDto>{
        const newColection = this.collectionRepo.create(dto);
        return  await this.collectionRepo.save(newColection)
    }

    async findAll(reqDto: ListCollectionReqDto):Promise<OffsetPaginatedDto<CollectionResDto>> {
        const query = this.collectionRepo.createQueryBuilder('product_colections').orderBy(
            'product_colections.createdAt',
            'DESC'
        )

        const [taxes,metaDto] = await paginate<ProductColectionEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToClass(CollectionResDto, taxes), metaDto);
    }

    async findOne(id: number):Promise<CollectionResDto> {
        assert(id, 'id is required');
        const collection = await this.collectionRepo.findOneByOrFail({id});
        return collection.toDto(CollectionResDto);
    }

    async update(id: number, dto: UpdateProductCollectionDto) {
        const collection = await this.collectionRepo.findOneByOrFail({id});
        collection.name = dto.name;
        collection.slug = dto.slug;
        collection.description = dto.description
        collection.status = dto.image
        collection.is_featured = dto.is_featured
        collection.status = dto.status

        return this.collectionRepo.save(collection);
    }

    async remove(id: number) {
        await this.collectionRepo.findOneByOrFail({id});
		await this.collectionRepo.softDelete(id);
    }
}
