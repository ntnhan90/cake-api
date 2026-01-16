import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany,JoinTable} from "typeorm";
import { ProductCategoryEntity } from 'src/modules/product-categories/entities/product-category.entity';
import { ProductTagEntity } from 'src/modules/product-tags/entities/product-tag.entity';
import { ProductColectionEntity } from 'src/modules/product-collections/entities/product-collection.entity';
import { ProductLabelsEntity } from 'src/modules/product-labels/entities/product-label.entity';

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

    @Column()
    slug:string

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

    @Column('decimal', { precision: 6, scale: 2,nullable:true, default:0},)
    price:number 

    @Column('decimal', { precision: 6, scale: 2,nullable:true,},)
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

    @Column('decimal', { precision: 6, scale: 2,nullable:true, default:0 })
    length: number

    @Column('decimal', { precision: 6, scale: 2 ,nullable:true, default:0})
    wide: number

    @Column('decimal', { precision: 6, scale: 2,nullable:true , default:0})
    height: number

    @Column('decimal', { precision: 6, scale: 2 ,nullable:true, default:0})
    weight: number

    @Column({default:0})
    views:number


    @ManyToMany(()=>ProductCategoryEntity, (product_category) => product_category.products,{
        cascade: true// cho phép tạo tag mới khi save post
    })
    @JoinTable({
        name: 'product_category_product',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'product_category_id',
            referencedColumnName: 'id',
        },
    })
    categories: ProductCategoryEntity[]

    @ManyToMany(()=>ProductTagEntity, (product_tags) => product_tags.products,{
        cascade: true// cho phép tạo tag mới khi save post
    })
    @JoinTable({
        name: 'product_tag_product',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'product_tag_id',
            referencedColumnName: 'id',
        },
    })
    tags: ProductTagEntity[]

    @ManyToMany(()=>ProductLabelsEntity, (product_labels) => product_labels.products,{
        cascade: true// cho phép tạo tag mới khi save post
    })
    @JoinTable({
        name: 'product_label_product',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'product_label_id',
            referencedColumnName: 'id',
        },
    })
    labels: ProductLabelsEntity[]


    @ManyToMany(()=>ProductColectionEntity, (product_collections) => product_collections.products,{
        cascade: true// cho phép tạo tag mới khi save post
    })
    @JoinTable({
        name: 'product_collection_product',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'product_collection_id',
            referencedColumnName: 'id',
        },
    })
    collections: ProductColectionEntity[]

}
