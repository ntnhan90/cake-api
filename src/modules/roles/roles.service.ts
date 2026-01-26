import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ListRoleReqDto } from './dto/list-role.req.dto';
import { RoleResDto } from './dto/role.res.dto';
import { RoleRepository } from './repo/role.repo';
import { RoleEntity } from './entities/role.entity';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import assert from 'assert';
import { InjectRepository } from '@nestjs/typeorm';
import { In,Repository } from 'typeorm';
import { PermissionEntity } from '../permission/entities/permission.entity';

@Injectable()
export class RolesService {
    constructor(
        private readonly roleRepo: RoleRepository,
        @InjectRepository(PermissionEntity)
        private readonly permissionRepo: Repository<PermissionEntity>,
    ){}

    async create(dto: CreateRoleDto):Promise<RoleResDto>  {
        const role = this.roleRepo.create({
            name: dto.name,
            description: dto.description,
            is_default: dto.is_default,
        });

        if (dto.permissionIds?.length) {
            role.permissions = await this.permissionRepo.findBy({
                id: In(dto.permissionIds),
            });
        }

        return this.roleRepo.save(role);
    }

    async findAll(reqDto: ListRoleReqDto):Promise<OffsetPaginatedDto<RoleResDto>> {
        const query = this.roleRepo.createQueryBuilder('roles').orderBy(
            'roles.createdAt',
            'DESC'
        )

        const [roles,metaDto] = await paginate<RoleEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(RoleResDto, roles), metaDto);
    }

    async findOne(id: number) :Promise<RoleResDto> {
        assert(id, 'id is required');
        const role = await this.roleRepo.findOneByOrFail({id});
        return role.toDto(RoleResDto);
    }

    async update(id: number, dto: UpdateRoleDto) {
        const role = await this.roleRepo.findOneByOrFail({id});
        role.name = dto.name;
        role.description = dto.description;
      //  role.permissions = dto.permissions;
        role.is_default = dto.is_default

        return this.roleRepo.save(role);
    }

    async remove(id: number) {
        await this.roleRepo.findOneByOrFail({id});
		await this.roleRepo.softDelete(id);
    }
}
