import { Controller, Get, Post, Body, Put, Param, Delete,Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersResDto } from './dto/orders.res.dto';
import { ListOrdersReqDto } from './dto/list-orders.req';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() dto: CreateOrderDto) :Promise<OrdersResDto>{
        return this.ordersService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto: ListOrdersReqDto) :Promise<OffsetPaginatedDto<OrdersResDto>> {
        return this.ordersService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) :Promise<OrdersResDto> {
        return this.ordersService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
      return this.ordersService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.ordersService.remove(+id);
    }
  }
