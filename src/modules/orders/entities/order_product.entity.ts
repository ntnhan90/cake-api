import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn} from "typeorm";
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity('order_product')
export class OrderProductEntity extends AbstractEntity {
    constructor(data?: Partial<OrderProductEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => OrderEntity, order => order.products, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;

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

    /* ================= PRODUCT ================= */
    @ManyToOne(() => ProductEntity, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'product_id' })
    product?: ProductEntity;

    @Column()
    product_name:string

    @Column({nullable:true})
    product_image:string
}
