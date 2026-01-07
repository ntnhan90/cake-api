import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
    
    @Column()
    category_id:number
    
    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PUBLISHED,
    })
    status:string
}
