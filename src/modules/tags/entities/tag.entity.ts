import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,Index , ManyToMany} from "typeorm";
import { PostEntity } from 'src/modules/posts/entities/post.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('tags')
export class TagEntity extends AbstractEntity {
    constructor(data?: Partial<TagEntity>){
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

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PUBLISHED,
    })
    status:string

    @ManyToMany(() => PostEntity, (post) => post.tags)
    posts: PostEntity[];
}
