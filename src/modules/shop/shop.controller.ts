import { Controller, Get, Post, Body, Put, Param, Delete,Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopResDto } from './dto/shop.res.dto';
import { ListShopReqDto } from './dto/list-shop.req.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Post()
    create(@Body() dto: CreateShopDto) :Promise<ShopResDto> {
      return this.shopService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto: ListShopReqDto) :Promise<OffsetPaginatedDto<ShopResDto>> {
      return this.shopService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) :Promise<ShopResDto> {
      return this.shopService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateShopDto) {
      return this.shopService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.shopService.remove(+id);
    }
}
