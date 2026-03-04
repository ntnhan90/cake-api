import { Controller, Get, Post, Body, Put, Param, Delete , Query} from '@nestjs/common';
import { SupplyOrdersService } from './supply-orders.service';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { UpdateSupplyOrderDto } from './dto/update-supply-order.dto';
import { Public } from '@/decorators/public.decorators';
import { SupplyOrdersResDto } from './dto/supply-order.res.dto';
import { ListSupplyOrdersReqDto } from './dto/list-supply-order.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';


@Controller('supply-orders')
export class SupplyOrdersController {
    constructor(private readonly supplyOrdersService: SupplyOrdersService) {}

    @Post()
    create(@Body() dto: CreateSupplyOrderDto) :Promise<SupplyOrdersResDto>{
        return this.supplyOrdersService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto:ListSupplyOrdersReqDto): Promise<OffsetPaginatedDto<SupplyOrdersResDto>>  {
        return this.supplyOrdersService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<SupplyOrdersResDto> {
        return this.supplyOrdersService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateSupplyOrderDto) {
        return this.supplyOrdersService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.supplyOrdersService.remove(+id);
    }
}
