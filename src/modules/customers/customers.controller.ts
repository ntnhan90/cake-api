import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ListCustomerReqDto } from './dto/list-customer.req.dto';
import { CustomerResDto } from './dto/customer.res.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Public } from '@/decorators/public.decorators';
import { UpdateCustomerPasswordDto } from './dto/update-customer-password.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    create(@Body() dto: CreateCustomerDto): Promise<CustomerResDto> {
        return this.customersService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto:ListCustomerReqDto) :Promise<OffsetPaginatedDto<CustomerResDto>>{
        return this.customersService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) : Promise<CustomerResDto> {
        return this.customersService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateCustomerDto) {
        return this.customersService.update(+id, dto);
    }

    @Put('password')
    updatePassword(@Param('id') id: number, @Body() dto: UpdateCustomerPasswordDto,) {
        return this.customersService.updatePassword(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.customersService.remove(+id);
    }
}
