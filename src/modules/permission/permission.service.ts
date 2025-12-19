import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ListPermissionReqDto } from './dto/list-permission';
import { PermissionResDto } from './dto/permission.res.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { PermisstionRepository } from './repo/permission.repo';
import { PermissionEntity } from './entities/permission.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToClass } from 'class-transformer';
import assert from 'assert';

@Injectable()
export class PermissionService {
    constructor(private readonly permissionRepo: PermisstionRepository){}
    
    async create(dto: CreatePermissionDto) :Promise<PermissionResDto>{
        const newPermisstion = this.permissionRepo.create(dto);
        return await this.permissionRepo.save(newPermisstion);
    }

    async findAll(reqDto: ListPermissionReqDto) :Promise<OffsetPaginatedDto<PermissionResDto>>{
        const query = this.permissionRepo.createQueryBuilder('permissions').orderBy(
            'permissions.createdAt',
            'DESC'
        )

        const [permission,metaDto] = await paginate<PermissionEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToClass(PermissionResDto, permission), metaDto)
    }

    async findOne(id: number) :Promise<PermissionResDto> {
        assert(id, 'id is required');
        const permission = await this.permissionRepo.findOneByOrFail({id});
        return permission.toDto(PermissionResDto);
    }

    async update(id: number, dto: UpdatePermissionDto) {
        const permission = await this.permissionRepo.findOneByOrFail({id});
       
        
        return this.permissionRepo.save(permission);
    }

    async remove(id: number) {
        await this.permissionRepo.findOneByOrFail({id});
		await this.permissionRepo.softDelete(id);
    }
}
