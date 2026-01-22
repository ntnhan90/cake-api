import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

export enum Type {
    COUPON = "coupon",
    PROMOTION = "promotion",
}

export enum TypeOption {
    AMOUNT = "amount",
    PERCENTAGE = "percentage",
   // SHIPPING = "coupon",
    SAME_PRICE = "same_price",
}

export enum Target {
    ALL_ORDERS = "All_order",
    PRODCUT_COLLECTIONS = "product_collections",
    PRODUCT_BY_CATE = "product_category",
    PRODUCT = "prodcuct",
    CUSTOMER = "customer",
    MINIMUM_ORDER = "minimun_order",
}
@Entity('discounts')
export class DiscountEntity extends AbstractEntity{
    constructor(data?: Partial<DiscountEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    code:string

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    start_date: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    end_date: Date;

    @Column({nullable:true})
    quantity:number

    @Column({default:0})
    total_used:number

    @Column()
    value:string

    @Column({
        type: "enum",
        enum: Type,
        default: Type.COUPON,
    })
    type:string	

    @Column({default: 0})
    can_use_with_promotion:number
    

    // giảm giá tiền, %, đồng giá
    @Column({
        type: "enum",
        enum: TypeOption,
        default: TypeOption.AMOUNT,
    })
    type_option:string

    // cate, collection , product ( dành cho same_price)
    // all orders, MINIMUM_ORDER, customer
    @Column({
        type: "enum",
        enum: Target,
        default: Target.ALL_ORDERS,
    })
    target:string

    @Column({default:0})
    display_at_checkout:number
}
