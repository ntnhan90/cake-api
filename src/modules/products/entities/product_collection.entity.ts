import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('products_colections')
export class ProductColectionEntity extends AbstractEntity {
    constructor(data?: Partial<ProductColectionEntity>){
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

    @Column({nullable:true})
    image:string


    @Column({default:0})
    is_featured:number

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string
}
