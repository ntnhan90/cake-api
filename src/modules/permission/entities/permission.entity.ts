import { AbstractEntity } from "@/database/entities/abstract.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn, ManyToMany,JoinTable} from "typeorm";
import { HTTPMethod } from "@/constants/role.constant";
import { RoleEntity } from "src/modules/roles/entities/role.entity";

@Entity('permissions')
export class PermissionEntity extends AbstractEntity {
    constructor(data?: Partial<PermissionEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    module:string

    @Column()
    path :string

    @Column({
        type: "enum",
        enum: HTTPMethod,
    })
    method:string

    @ManyToMany(() => RoleEntity, (roles) => roles.permissions)
    roles: RoleEntity[];
}
