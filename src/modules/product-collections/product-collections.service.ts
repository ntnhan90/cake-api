import { Injectable } from '@nestjs/common';
import { CreateProductCollectionDto } from './dto/create-product-collection.dto';
import { UpdateProductCollectionDto } from './dto/update-product-collection.dto';
import { ListCollectionReqDto } from './dto/list-collection.req.dto';
import { CollectionResDto } from './dto/collection.res.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ProductColectionRepository } from './repo/proCollection.repo';
import { ProductColectionEntity } from './entities/product-collection.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';
import {Order} from '@/constants/app.constant';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductCollectionsService {
    constructor(
        @InjectRepository(ProductColectionEntity)
        private readonly collectionRepo: Repository<ProductColectionEntity>,
    ){}

    async create(dto: CreateProductCollectionDto) :Promise<CollectionResDto>{
        const newColection = this.collectionRepo.create(dto);
        return await this.collectionRepo.save(newColection)
    }

    async findAll(reqDto: ListCollectionReqDto):Promise<OffsetPaginatedDto<CollectionResDto>> {
        const order = reqDto.order ?? Order.DESC;
        const query = this.collectionRepo
            .createQueryBuilder('product_colections')
            .orderBy( 'product_colections.createdAt',order)

        if (reqDto.q?.trim()) {
            query.andWhere(
            '(product_colections.name LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }
        const [collections,metaDto] = await paginate<ProductColectionEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(CollectionResDto, collections), metaDto);
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
        if (dto.description !== undefined) {
            collection.description = dto.description; // có thể là null hoặc string
        }
        if (dto.image !== undefined) {
            collection.image = dto.image; // có thể là null hoặc string
        }
        collection.is_featured = dto.is_featured
        collection.status = dto.status

        return this.collectionRepo.save(collection);
    }

    async remove(id: number) {
        await this.collectionRepo.findOneByOrFail({id});
		await this.collectionRepo.softDelete(id);
    }
}
