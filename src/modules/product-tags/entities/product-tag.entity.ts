import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,Index, ManyToMany} from "typeorm";
import { ProductEntity } from 'src/modules/products/entities/product.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('product_tags')
@Index(['name'], { unique: true })
export class ProductTagEntity extends AbstractEntity {
    constructor(data?: Partial<ProductTagEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    slug:string

    @Column('text',{nullable:true})
    description:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    @ManyToMany(() => ProductEntity, (products) => products.tags)
    products: ProductEntity[];
}
