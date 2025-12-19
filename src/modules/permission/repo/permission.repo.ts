import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PermissionEntity } from "../entities/permission.entity";

@Injectable()
export class PermisstionRepository extends Repository<PermissionEntity> {
    constructor(private readonly dataSource: DataSource){
        super(PermissionEntity, dataSource.createEntityManager());
    }
}