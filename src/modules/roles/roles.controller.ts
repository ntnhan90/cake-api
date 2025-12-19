import { Controller, Get, Post, Body, Put, Param, Delete , Query} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ListRoleReqDto } from './dto/list-role.req.dto';
import { RoleResDto } from './dto/role.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    async create(@Body() dto: CreateRoleDto) :Promise<RoleResDto> {
        return this.rolesService.create(dto);
    }

    @Get()
    async findAll(@Query() reqDto: ListRoleReqDto) :Promise<OffsetPaginatedDto<RoleResDto>> {
        return this.rolesService.findAll(reqDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number):Promise<RoleResDto>  {
        return this.rolesService.findOne(+id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
        return this.rolesService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }
}
