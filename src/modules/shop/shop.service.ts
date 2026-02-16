import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ListShopReqDto } from './dto/list-shop.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { ShopEntity } from './entities/shop.entity';
import { FranchiseEntity } from '../franchise/entities/franchise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { Logger } from '@nestjs/common';
import {Order} from '@/constants/app.constant';
import { ShopResDto } from './dto/shop.res.dto';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopRepo: Repository<ShopEntity>,

        @InjectRepository(FranchiseEntity)
        private readonly franchiseRepo: Repository<FranchiseEntity>,
    ){};

    async create(dto: CreateShopDto): Promise<ShopResDto>  {
        const franchise = await this.franchiseRepo.findOne({
            where: { id: dto.franchise_id },
        });
        if (!franchise) {
            throw new NotFoundException('Franchise not found');
        }
        
        const newShop = this.shopRepo.create({
            name: dto.name,
            address: dto.address,
            city: dto.city,
            postal_code: dto.postal_code,
            is_active: dto.is_active,
            status: dto.status,
            franchise: franchise, // 🔥 đúng relation
        });
        const savedShop = await this.shopRepo.save(newShop);
        // ✅ convert Entity → DTO
        return plainToInstance(ShopResDto, savedShop, {
            excludeExtraneousValues: true,
        });
    }

    async findAll(reqDto: ListShopReqDto)  :Promise<OffsetPaginatedDto<ShopResDto>>{
        const order = reqDto.order ?? Order.DESC;

        const query = this.shopRepo
            .createQueryBuilder('franchisees')
            .orderBy('franchisees.createdAt', order)
            .addOrderBy('franchisees.id', order);
        /*
        if (reqDto.q?.trim()) {
            query.andWhere(
            '(posts.name LIKE :q OR posts.slug LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }
        */
        const [franchisees, metaDto] = await paginate<ShopEntity>(
            query, 
            reqDto,
            {
                skipCount: false,
                takeAll: false,
            }
        );

        return new OffsetPaginatedDto(
            plainToInstance(ShopResDto, franchisees),
            metaDto
        );
    }

    async findOne(id: number): Promise<ShopResDto>  {
        assert(id,'id is required');
        const order = await this.shopRepo.findOne({
            where: { id },
                //relations: ['tags', 'categories'],
        });
        return order.toDto(ShopResDto);
    }

    async update(id: number, updateShopDto: UpdateShopDto) {
        const shop = await this.shopRepo.findOneByOrFail({id})

    
        return this.shopRepo.save(shop);
    }

    async remove(id: number) {
        await this.shopRepo.findOneByOrFail({ id });
        await this.shopRepo.softDelete(id);
        return true;
    }
}
