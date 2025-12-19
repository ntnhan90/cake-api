import { Injectable } from '@nestjs/common';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { CreateProductLabelDto } from './dto/create-product-label.dto';
import { UpdateProductLabelDto } from './dto/update-product-label.dto';
import { ProductLabelsRepository } from './repo/product-labels.repo';
import { ProductLabelsEntity } from './entities/product-label.entity';
import { ListLabelsReqDto } from './dto/list-labels.req.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { LabelsResDto } from './dto/label.res.dto';
@Injectable()
export class ProductLabelsService {
    constructor(private readonly proLabelsRepository: ProductLabelsRepository) {}

    async create(dto: CreateProductLabelDto) {
        const newLabel = this.proLabelsRepository.create(dto);
        return this.proLabelsRepository.save(newLabel);
    }
    
    async findAll(reqDto: ListLabelsReqDto):Promise<OffsetPaginatedDto<LabelsResDto>> {
        const query = this.proLabelsRepository.createQueryBuilder('product_labels').orderBy(
            'product_labels.createdAt',
            'DESC'
        )
        const [posts, metaDto] = await paginate<ProductLabelsEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(LabelsResDto, posts), metaDto);;
    }

    async findOne(id: number) :Promise<LabelsResDto>{
        const label = await this.proLabelsRepository.findOneByOrFail({id})

        return label.toDto(LabelsResDto);
    }

    async update(id: number, dto: UpdateProductLabelDto) {
        const label = await this.proLabelsRepository.findOneByOrFail({id});
        label.name = dto.name;
        label.color = dto.color;
        label.status = dto.status;
        
        return this.proLabelsRepository.save(label)
    }

    async remove(id: number) {
        await this.proLabelsRepository.findOneByOrFail({id});
        await this.proLabelsRepository.softDelete({id});
        //return `This action removes a #${id} productLabel`;
    }

    
}
