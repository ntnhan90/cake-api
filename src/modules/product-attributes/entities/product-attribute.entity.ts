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

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductAttributeSetEntity,
    set => set.attributes,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'attribute_set_id' })
  attributeSet: ProductAttributeSetEntity;

  @Column()
  title: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  image: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
