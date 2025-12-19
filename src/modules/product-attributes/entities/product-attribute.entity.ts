import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

    @Column()
    attribute_set_id :number

    @Column()
    title :string

    @Column()
    slug :string

    @Column()
    color :string

    @Column()
    is_default :number

    @Column()
    order :number
}
