import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany,CreateDateColumn} from "typeorm";

@Entity('device')
export class DeviceEntity extends AbstractEntity {
    constructor(data?: Partial<DeviceEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId:number

    @Column()
    username:string	
    
    @Column()
    userAgent:string		
    
    @Column()
    ip:string
    
    @Column({nullable:true})
    refresh_token: string

    @Column({default:1})
    isActive:number	
    
}
