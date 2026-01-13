import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,ManyToMany} from "typeorm";
import { ProductEntity } from 'src/modules/products/entities/product.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('product_labels')
export class ProductLabelsEntity extends AbstractEntity {
    constructor(data?: Partial<ProductLabelsEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    color:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    @ManyToMany(() => ProductEntity, (products) => products.labels)
    products: ProductEntity[];
}
