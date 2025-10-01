import { AbstractEntity } from '@/database/entities/abstract.entity';
//import { hashPassword as hashPass } from '@/utils/password.util';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany,Relation} from "typeorm";
import { PostEntity } from 'src/modules/post/entities/post.entity';
@Entity('users')
export class UserEntity extends AbstractEntity {
    constructor(data?: Partial<UserEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column()
    email:string

    @Column()
    username:string	
    
    @Column()
    password:string		
    
    @Column()
    first_name:string
    
    @Column()
    last_name:string		
    
    @Column()
    isActive:number	
    
    @Column()
    avatar_id:string	
    
    @Column()
    refresh_token:string	
    
    @OneToMany(() => PostEntity, (post) => post.user)
    posts: Relation<PostEntity[]>;
}
