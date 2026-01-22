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
    
    async findAll(reqDto: ListPermissionReqDto) :Promise<OffsetPaginatedDto<PermissionResDto>> {
            const query = this.permissionRepo.createQueryBuilder('posts').orderBy(
                'posts.createdAt',
                'DESC'
            )
            const [posts, metaDto] = await paginate<PermissionEntity>(query, reqDto, {
                skipCount: false,
                takeAll: true,
            });
    
            return new OffsetPaginatedDto(plainToInstance(PermissionEntity, posts), metaDto);
        }
    /*
    async findAll(reqDto: ListPermissionReqDto): Promise<PermissionResDto[]> {
        const query = this.permissionRepo
            .createQueryBuilder('permissions')
            .orderBy('permissions.createdAt', 'DESC');

        // ÉP lấy hết
     //   query.take(undefined);
      //  query.skip(undefined);

        const permissions = await query.getMany();

        return plainToInstance(PermissionResDto, permissions, {
            excludeExtraneousValues: true,
        });
    }
        */
}
