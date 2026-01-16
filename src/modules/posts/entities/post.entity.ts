import { AbstractEntity } from '@/database/entities/abstract.entity';
import { TagEntity } from 'src/modules/tags/entities/tag.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { PostCategoryEntity } from './post_categories.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable,OneToMany} from "typeorm";

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('posts')
export class PostEntity extends AbstractEntity {
    constructor(data?: Partial<PostEntity>){
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

    @Column('text',{nullable:true})
    content:string

    @Column()   
    user_id:number

    @Column()   
    is_featured:number

    @Column({nullable:true})   
    image:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    @Column({default:0})   
    views:number

    @ManyToMany(()=>TagEntity, (tag) => tag.posts,{
        cascade: true// cho phép tạo tag mới khi save post
    })
    @JoinTable({
        name: 'post_tags',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
    })
    tags: TagEntity[]

    @OneToMany(
    () => PostCategoryEntity,
        postCategory => postCategory.post,
    )
    postCategories: PostCategoryEntity[];
}
