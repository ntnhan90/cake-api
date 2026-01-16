import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,DeleteDateColumn} from "typeorm";
import { ProductAttributeEntity } from './product-attribute.entity';
export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('product_attribute_sets')
export class ProductAttributeSetEntity extends AbstractEntity {
    constructor(data?: Partial<ProductAttributeSetEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    slug:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @OneToMany(
        () => ProductAttributeEntity,
        attr => attr.attributeSet,
        { cascade: false }, // ❌ KHÔNG cascade
    )
    attributes: ProductAttributeEntity[];
}
