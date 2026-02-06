import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,OneToMany} from "typeorm";
import { OrderProductEntity } from './order_product.entity';
import { OrderAddressesEntity } from './order_addresses.entity';
export enum STATUS {
    PENDING = "pending",
    COMPLETED = "completed",
}

export enum PAYMENT_STATUS {
    PENDING = "pending",
    COMPLETED = "completed",
    REFUNDING = "refunding",
    REFUNDED = "refunded",
    FRAUD = "fraud",
    FAILED = "failed",
    CANCELED = "canceled",
}

export enum PAYMENT_METHOD {
    COD = "pending",
    BANK_TRANFER = "bank_tranfer",
}


@Entity('orders')
export class OrderEntity extends AbstractEntity {
    constructor(data?: Partial<OrderEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    code:string

    @Column({nullable:true})
    customer_id:number

    @Column({nullable:true})
    shipping_option:number

    @Column({default:"default"})
    shipping_method:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PENDING,
    })
    status:STATUS

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    total_amount:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default:'0.00',
    })
    tax_amount:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default:'0.00',
    })
    shipping_amount:string

    @Column({ type: 'text' , nullable:true})
    note: string;
    
    @Column({nullable:true})
    coupon_code:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default:'0.00',
    })
    discount_amount:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    sub_amount:string

    @Column({
        type: "enum",
        enum: PAYMENT_STATUS,
        default: PAYMENT_STATUS.PENDING,
    })
    payment_status:PAYMENT_STATUS

    @Column({nullable:true})
    payment_method: string

    @OneToMany(() => OrderProductEntity, products => products.order)
    products: OrderProductEntity[];

    @OneToMany(() => OrderAddressesEntity, address => address.order)
    address: OrderAddressesEntity[];
}
