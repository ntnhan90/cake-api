import { AbstractEntity } from '@/database/entities/abstract.entity';
import { hashPassword as hashPass } from '@/utils/password.util';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany,Relation, BeforeInsert, BeforeUpdate,DeleteDateColumn} from "typeorm";
import { PostEntity } from 'src/modules/post/entities/post.entity';
import { DeviceEntity } from './device.entity';

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

    @Column({nullable:true})
    phone:string	
    
    @Column({default:1})
    isActive:number	
    
    @Column({nullable:true})
    avatar_id:string	
    
    @Column({nullable:true})
    refresh_token: string

    @OneToMany(() => DeviceEntity, (device) => device.userId)
    device?: DeviceEntity[];

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: Relation<PostEntity[]>;


    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        default: null,
        nullable:true
    })
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            this.password = await hashPass(this.password)
        }
    }
}
