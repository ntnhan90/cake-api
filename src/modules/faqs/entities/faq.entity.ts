import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn} from "typeorm";
import { FaqCateEntity } from 'src/modules/faq-cate/entities/faq-cate.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('faqs')
export class FaqsEntity extends AbstractEntity {
    constructor(data?: Partial<FaqsEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number
    
    @Column('text')
    question:string
    
    @Column('text')
    answer:string
    
    @ManyToOne(() => FaqCateEntity, cate => cate.faqs)
    @JoinColumn({ name: 'category_id' })
    category: FaqCateEntity;
    
    @Column()
    category_id: number

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PUBLISHED,
    })
    status:string
}
