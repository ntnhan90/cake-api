import { Controller, Get, Post, Body, Put, Param, Delete,Query } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Public } from '@/decorators/public.decorators';
import { WarehouseResDto } from './dto/warehouse.res.dto';
import { ListWarehouseReqDto } from './dto/list-warehouse.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly warehousesService: WarehousesService) {}

    @Post()
    create(@Body() dto: CreateWarehouseDto) :Promise<WarehouseResDto>{
        return this.warehousesService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto:ListWarehouseReqDto): Promise<OffsetPaginatedDto<WarehouseResDto>>  {
        return this.warehousesService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<WarehouseResDto> {
        return this.warehousesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateWarehouseDto) {
        return this.warehousesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.warehousesService.remove(+id);
    }
}
