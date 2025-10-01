import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,DeleteDateColumn,ManyToOne, Relation,JoinColumn,ManyToMany, JoinTable} from "typeorm";
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { TagEntity } from './tag.entity';
import { CategoryEntity } from './category.entity';

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

@Entity('posts')
export class PostEntity extends AbstractEntity{
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

    @Column({ name: 'user_id' })
    user_id:number

    @Column()
    is_featured:number

    @Column()
    image:string

    @Column({default: 0})
    views:number

    @Column()
    description:string

    @Column('text')
    content:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string	

    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_post_user_id',
    })
    @ManyToOne(() => UserEntity, (user) => user.posts)
    user: Relation<UserEntity>;

    @ManyToMany(() => TagEntity)
    @JoinTable()
    tag: TagEntity[];

    @ManyToMany(() => CategoryEntity)
    @JoinTable()
    cate: CategoryEntity[]

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        default: null,
    }) 
    deletedAt: Date;
}
