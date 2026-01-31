import { Injectable } from '@nestjs/common';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { CreateProductLabelDto } from './dto/create-product-label.dto';
import { UpdateProductLabelDto } from './dto/update-product-label.dto';
import { ProductLabelsEntity } from './entities/product-label.entity';
import { ListLabelsReqDto } from './dto/list-labels.req.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { LabelsResDto } from './dto/label.res.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Order} from '@/constants/app.constant';

@Injectable()
export class ProductLabelsService {
    constructor(
        @InjectRepository(ProductLabelsEntity)
        private readonly proLabelsRepo: Repository<ProductLabelsEntity>,
    ) {}

    async create(dto: CreateProductLabelDto) {
        const newLabel = this.proLabelsRepo.create(dto);
        return this.proLabelsRepo.save(newLabel);
    }
    
    async findAll(reqDto: ListLabelsReqDto):Promise<OffsetPaginatedDto<LabelsResDto>> {
        const order = reqDto.order ?? Order.DESC;
        const query = this.proLabelsRepo
            .createQueryBuilder('product_labels')
            .orderBy( 'product_labels.createdAt', order  )
        const [posts, metaDto] = await paginate<ProductLabelsEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(LabelsResDto, posts), metaDto);;
    }

    async findOne(id: number) :Promise<LabelsResDto>{
        const label = await this.proLabelsRepo.findOneByOrFail({id})

        return label.toDto(LabelsResDto);
    }

    async update(id: number, dto: UpdateProductLabelDto) {
        const label = await this.proLabelsRepo.findOneByOrFail({id});
        label.name = dto.name;
        label.color = dto.color;
        label.status = dto.status;
        
        return this.proLabelsRepo.save(label)
    }

    async remove(id: number) {
        await this.proLabelsRepo.findOneByOrFail({id});
        await this.proLabelsRepo.softDelete({id});
        //return `This action removes a #${id} productLabel`;
    }

    
}
