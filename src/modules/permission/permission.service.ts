import { Injectable } from '@nestjs/common';
import { ListPermissionReqDto } from './dto/list-permission';
import { PermissionResDto } from './dto/permission.res.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { PermisstionRepository } from './repo/permission.repo';
import { PermissionEntity } from './entities/permission.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PermissionService {
    constructor(private readonly permissionRepo: PermisstionRepository){}
    
    async findAll(reqDto: ListPermissionReqDto) :Promise<OffsetPaginatedDto<PermissionResDto>>{
        const query = this.permissionRepo.createQueryBuilder('permissions').orderBy(
            'permissions.createdAt',
            'DESC'
        )

        const [permission,metaDto] = await paginate<PermissionEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(PermissionResDto, permission), metaDto)
    }
}
