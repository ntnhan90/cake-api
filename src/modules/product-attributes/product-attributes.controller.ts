import { Controller, Get, Post, Body, Put, Param, Delete,Query } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { CreateAttributeSetDto} from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { AttributeResDto } from './dto/attributes.res.dto';
import { ListAttributesReqDto } from './dto/list-attribute.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Public } from '@/decorators/public.decorators';

@Controller('product-attributes')
export class ProductAttributesController {
    constructor(private readonly productAttributesService: ProductAttributesService) {}

    @Post()
    create(@Body() dto: CreateAttributeSetDto) {
        return this.productAttributesService.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() reqDto:ListAttributesReqDto): Promise<OffsetPaginatedDto<AttributeResDto>>  {
        return this.productAttributesService.findAll(reqDto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productAttributesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateAttributeSetDto) {
        return this.productAttributesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productAttributesService.remove(+id);
    }
}
