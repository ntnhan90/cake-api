import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity('order_product')
export class OrderAddressesEntity extends AbstractEntity {
    constructor(data?: Partial<OrderAddressesEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order_id:number

    @Column({default:1})
    qty:number

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default:'0.00',
    })
    tax_amount: string;

    @Column({ type: 'text' , nullable:true})
    product_options: string;

    @Column({nullable:true})
    product_id:number

    @Column()
    product_name:string

    @Column({nullable:true})
    product_image:string
}
