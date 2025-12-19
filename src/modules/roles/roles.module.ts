import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repo/role.repo';
@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    controllers: [RolesController],
    providers: [RolesService,RoleRepository],
})
export class RolesModule {}
