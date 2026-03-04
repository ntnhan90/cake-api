import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,Index , ManyToMany} from "typeorm";

export enum STATUS {
    ACTIVE = "active",
    INACTIVE = "Inactive",
}

@Entity('warehouse')
export class WarehouseEntity extends AbstractEntity {
    constructor(data?: Partial<WarehouseEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    country:string

    @Column()
    location:string

    @Column()
    address:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.INACTIVE,
    })
    status:string
}
