import { AbstractEntity } from '@/database/entities/abstract.entity';
//import { hashPassword as hashPass } from '@/utils/password.util';
import { Entity, PrimaryGeneratedColumn, Column, Index,} from "typeorm";

export enum STATUS {
    ACTIVATED = "activated",
    DRAFT = "draft",
}


@Entity('customers')
export class CustomerEntity extends AbstractEntity {
    constructor(data?: Partial<CustomerEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column()
    email:string

    @Column()
    name:string	

    @Column()
    password:string	

    @Column({nullable:true})
    avatar:string

    @Column({nullable:true})
    dob:Date
    
    @Column({nullable:true})
    phone:string

    @Column({nullable:true})
    remember_token:string

    @Column({nullable:true})
    confirmed_at:Date

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.ACTIVATED,
    })
    status:string	
}
