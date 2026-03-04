import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,Index , ManyToMany} from "typeorm";

export enum STATUS {
    SUBMMITTED = "Submitted",
    APPROVED = "Approved",
    SHIPPED = "Shipped",
    RECEIVED = "Received",
    CANCELLED = "Cancelled"
}

@Entity('supply_orders')
export class SupplyOrderEntity extends AbstractEntity {
    constructor(data?: Partial<SupplyOrderEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    shop_id:number

    @Column({ type: 'date' })
    order_date:Date

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.SUBMMITTED,
    })
    status:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    total_cost:string
}
