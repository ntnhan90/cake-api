import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}


@Entity('faq_categories')
export class FaqCateEntity extends AbstractEntity{
    constructor(data?: Partial<FaqCateEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    order:number

    @Column('text',{nullable:true})
    description:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PUBLISHED,
    })
    status:string
}