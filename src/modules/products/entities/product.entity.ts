import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany,JoinTable} from "typeorm";
import { ProductCategoryEntity } from './product_categories.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('products')
export class ProductEntity extends AbstractEntity {
    constructor(data?: Partial<ProductEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column('text',{nullable:true})
    description:string

    @Column('text',{nullable:true})
    content:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    @Column({nullable:true})
    image:string

    @Column('text',{nullable:true})
    images:string

    @Column({nullable:true})
    sku:string

    @Column({default:0})
    order:number

    @Column({default:0})
    is_featured:number

    @Column('decimal', { precision: 6, scale: 2,nullable:true},)
    price:number

    @Column('decimal', { precision: 6, scale: 2,nullable:true},)
    sale_price:number

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

    @Column('decimal', { precision: 6, scale: 2,nullable:true })
    length: number

    @Column('decimal', { precision: 6, scale: 2 ,nullable:true})
    wide: number

    @Column('decimal', { precision: 6, scale: 2,nullable:true })
    height: number

    @Column('decimal', { precision: 6, scale: 2 ,nullable:true})
    weight: number

    @Column({default:0})
    views:number

    @ManyToMany(() => ProductCategoryEntity)
    @JoinTable()
    cate: ProductCategoryEntity[]
}
