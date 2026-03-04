import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,Index , ManyToMany} from "typeorm";

export enum STATUS {
    SUBMMITTED = "Submitted",
    APPROVED = "Approved",
    SHIPPED = "Shipped",
    RECEIVED = "Received",
    CANCELLED = "Cancelled"
}

@Entity('supply_orders_details')
export class SupplyOrderDetailsEntity extends AbstractEntity {
    constructor(data?: Partial<SupplyOrderDetailsEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    supply_order_id:number

    @Column()
    material_id:number

    @Column()
    quantity:number

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    price_per_unit:string
}
