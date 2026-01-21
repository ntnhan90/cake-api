import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ListPermissionReqDto } from './dto/list-permission';
import { PermissionResDto } from './dto/permission.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Public()
    @Get()
    async findAll(@Query() reqDto: ListPermissionReqDto):Promise<OffsetPaginatedDto<PermissionResDto>> {
        return this.permissionService.findAll(reqDto);
    }
}
