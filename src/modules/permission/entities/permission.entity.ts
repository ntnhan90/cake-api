import { AbstractEntity } from "@/database/entities/abstract.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany,JoinTable} from "typeorm";
import { HTTPMethod } from "@/constants/role.constant";

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
}
