import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn,DeleteDateColumn} from "typeorm";
import { ProductAttributeSetEntity } from './product-attribute-set.entity';
export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('product_attributes')
export class ProductAttributeEntity extends AbstractEntity {
     constructor(data?: Partial<ProductAttributeEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => ProductAttributeSetEntity,
        set => set.attributes,
        { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'attribute_set_id' })
    attributeSet: ProductAttributeSetEntity;
    @Column()
    attribute_set_id :number

    @Column()
    title :string

    @Column()
    slug :string

    @Column({nullable:true})
    color :string

    @Column({nullable:true})
    image :string

    @Column()
    is_default :number

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
