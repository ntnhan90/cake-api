import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

export enum STATUS {
    PENDING = "pending",
    COMPLETED = "completed",
    REFUNDING = "refunding",
    REFUNDED = "refunded",
    FRAUD = "fraud",
    FAILED = "failed",
    CANCELED = "canceled",
}

export enum PAYMENTSTATUS {
    PENDING = "pending",
    COMPLETED = "completed",
}


@Entity('orders')
export class OrderEntity extends AbstractEntity {
    constructor(data?: Partial<OrderEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code:string

    @Column()
    user_id:number

    @Column({nullable:true})
    shipping_option:number

    @Column({default:"default"})
    shipping_method:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PENDING,
    })
    status:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    amount:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default:0.00,
        nullable:true
    })
    tax_amount:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default:0.00,
        nullable:true
    })
    shipping_amount:string

    @Column({ type: 'text' , nullable:true})
    description: string;
    
    @Column({nullable:true})
    coupon_code:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default:0.00,
        nullable:true
    })
    discount_amount:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    sub_total:string

    @Column({
        type: "enum",
        enum: PAYMENTSTATUS,
        default: PAYMENTSTATUS.PENDING,
    })
    payment_status:string

    @Column()
    payment_id: number
}
