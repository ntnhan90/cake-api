import { Injectable } from '@nestjs/common';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import { ListMaterialReqDto } from '../product-materials/dto/list-material.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { FranchiseEntity } from './entities/franchise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { Logger } from '@nestjs/common';
import {Order} from '@/constants/app.constant';
import { FranchiseResDto } from './dto/franchise.res.dto';

@Injectable()
export class FranchiseService {
    constructor(
        @InjectRepository(FranchiseEntity)
        private readonly franchiseRepo: Repository<FranchiseEntity>,
    ){};

    async create(dto: CreateFranchiseDto): Promise<FranchiseResDto> {
        const newFranchise = this.franchiseRepo.create(dto);
        return await this.franchiseRepo.save(newFranchise);
    }

    async findAll(reqDto: ListMaterialReqDto) :Promise<OffsetPaginatedDto<FranchiseResDto>>{
        const order = reqDto.order ?? Order.DESC;

        const query = this.franchiseRepo
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
        const [franchisees, metaDto] = await paginate<FranchiseEntity>(
            query, 
            reqDto,
            {
                skipCount: false,
                takeAll: false,
            }
        );

        return new OffsetPaginatedDto(
            plainToInstance(FranchiseResDto, franchisees),
            metaDto
        );
    }

    async findOne(id: number): Promise<FranchiseResDto>  {
        assert(id,'id is required');
        const order = await this.franchiseRepo.findOne({
            where: { id },
            //relations: ['tags', 'categories'],
        });
        return order.toDto(FranchiseResDto);
    }

    async update(id: number, updateFranchiseDto: UpdateFranchiseDto) {
        return `This action updates a #${id} franchise`;
    }

    async remove(id: number) {
        await this.franchiseRepo.findOneByOrFail({ id });
        await this.franchiseRepo.softDelete(id);
        return true;
    }
}
