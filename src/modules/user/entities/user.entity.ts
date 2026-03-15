import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index,ManyToMany,DeleteDateColumn,JoinTable} from "typeorm";
import { RoleEntity } from 'src/modules/roles/entities/role.entity';

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
    avatar:string	
    
    @Column({nullable:true})
    refresh_token: string

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        default: null,
        nullable:true
    })
    deletedAt: Date;

    @ManyToMany(()=>RoleEntity, (roles) => roles.users,{
        cascade: true// cho phép tạo tag mới khi save post
    })
    @JoinTable({
        name: 'role_users',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: RoleEntity[]
/*
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            this.password = await hashPass(this.password)
        }
    }
        */
}
