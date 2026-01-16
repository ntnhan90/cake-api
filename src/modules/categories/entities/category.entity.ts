import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,OneToMany} from "typeorm";
import { PostCategoryEntity } from 'src/modules/posts/entities/post_categories.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('categories')
export class CategoryEntity extends AbstractEntity {
    constructor(data?: Partial<CategoryEntity>){
        super();
        Object.assign(this, data)
    }
   
    @PrimaryGeneratedColumn()
    id: number

    @Column()   
    name:string

    @Column()   
    slug:string

    @Column({default:0})
    parent_id:number

    @Column('text',{nullable:true})
    description:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    @Column({default:0})
    order:number

    @Column({nullable:true})
    image:string

    @Column({default:0})
    is_featured:number

    @Column({default:0})
    is_default:number

    @OneToMany(
        () => PostCategoryEntity,
        postCategory => postCategory.category,
    )
    postCategories: PostCategoryEntity[];
}
