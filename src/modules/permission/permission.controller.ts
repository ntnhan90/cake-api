import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ListPermissionReqDto } from './dto/list-permission';
import { PermissionResDto } from './dto/permission.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post()
    async create(@Body() dto: CreatePermissionDto) :Promise<PermissionResDto>{
        return this.permissionService.create(dto);
    }

    @Get()
    async findAll(@Query() reqDto: ListPermissionReqDto):Promise<OffsetPaginatedDto<PermissionResDto>> {
        return this.permissionService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<PermissionResDto>{
        return this.permissionService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdatePermissionDto) {
        return this.permissionService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.permissionService.remove(+id);
    }
    }
