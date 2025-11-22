import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
export type WhereUniqueUserType = { id: number } | { email: string }

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private readonly dataSource: DataSource){
        super(UserEntity, dataSource.createEntityManager());
    }

    async updateRefreshTokenInUser(refreshToken, userId) {
        await this.update({ id: userId }, {
            refresh_token:refreshToken
        })
    }

    async findUniqueIncludeRolePermissions(id){
        const user = await this.findOneBy({ id });
        return user;
    }
    
}