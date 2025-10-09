import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private readonly dataSource: DataSource){
        super(UserEntity, dataSource.createEntityManager());
    }

    // Add custom methods for user-specific data access
    /*
    async findActiveUsers(): Promise<User[]> {
        return this.find({ where: { isActive: true } });
    }
        */
}