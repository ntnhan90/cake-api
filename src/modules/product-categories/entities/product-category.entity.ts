import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,ManyToMany} from "typeorm";
import { ProductEntity } from 'src/modules/products/entities/product.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('product_categories')
export class ProductCategoryEntity extends AbstractEntity {
    constructor(data?: Partial<ProductCategoryEntity>){
        super();
        Object.assign(this, data)
    }
   
    @PrimaryGeneratedColumn()
    id: number

    @Column()   
    name:string

    @Column()   
    slug:string

    @Column({default:0})
    parent_id:number

    @Column('text',{nullable:true})
    description:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    @Column({default:0})
    order:number

    @Column({nullable:true})
    image:string

    @Column({default:0})
    is_featured:number

    @Column({default:0})
    is_default:number

    @ManyToMany(() => ProductEntity, (products) => products.categories)
    products: ProductEntity[];
}
