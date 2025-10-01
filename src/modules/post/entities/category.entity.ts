import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('categories')
export class CategoryEntity extends AbstractEntity{
    constructor(data?: Partial<CategoryEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column({nullable:true})
    description:string

    @Column('text')
    content:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PUBLISHED,
    })
    status:string	

    @Column({nullable:true})
    icon:string

    @Column()
    order:number

    @Column({default: 0})
    is_featured:number

    @Column({default: 0})
    is_default:number

    @Column({default: 0})
    parent_id:number
}
