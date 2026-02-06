import { AbstractEntity } from '@/database/entities/abstract.entity';
//import { hashPassword as hashPass } from '@/utils/password.util';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn} from "typeorm";
import { CustomerEntity } from './customer.entity';

export enum STATUS {
    ACTIVATED = "activated",
    DRAFT = "draft",
}

@Entity('customer_addresses')
export class CustomerAddressEntity extends AbstractEntity {
    constructor(data?: Partial<CustomerAddressEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string	

    @Column()
    phone:string

    @Column({nullable:true})
    country:string

    @Column({nullable:true})
    state:string

    @Column({nullable:true})
    city:string

    @Column({nullable:true})
    address:string

    @Column({default:0})
    is_default:number

    @ManyToOne(() => CustomerEntity, customer => customer.addresses, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerEntity;
    
    @Column({nullable:true})
    zip_code:string
}
