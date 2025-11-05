import { Injectable } from '@nestjs/common';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { CreateProductLabelDto } from './dto/create-product-label.dto';
import { UpdateProductLabelDto } from './dto/update-product-label.dto';
import { ProductLabelsRepository } from './repo/product-labels.repo';
import { ProductLabelsEntity } from './entities/product-label.entity';
import { ListLabelsReqDto } from './dto/list-labels.req.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class ProductLabelsService {
    constructor(private readonly proLabelsRepository: ProductLabelsRepository) {}

    create(createProductLabelDto: CreateProductLabelDto) {
        return 'This action adds a new productLabel';
    }
    
    async findAll(
        reqDto: ListLabelsReqDto
    ):Promise<OffsetPaginatedDto<ListLabelsReqDto>> {
        const query = this.proLabelsRepository.createQueryBuilder('product_labels');
        const [posts, metaDto] = await paginate<ProductLabelsEntity>(query, reqDto, {
            skipCount: false,
            takeAll: false,
        });

        return new OffsetPaginatedDto(plainToInstance(ListLabelsReqDto, posts), metaDto);;
    }

    findOne(id: number) {
        return `This action returns a #${id} productLabel`;
    }

    update(id: number, updateProductLabelDto: UpdateProductLabelDto) {
        return `This action updates a #${id} productLabel`;
    }

    remove(id: number) {
        return `This action removes a #${id} productLabel`;
    }

    
}
