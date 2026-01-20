import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repo/role.repo';
import { PermissionEntity } from '../permission/entities/permission.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([RoleEntity,PermissionEntity]),
    ],
    controllers: [RolesController],
    providers: [RolesService,RoleRepository],
})
export class RolesModule {}
