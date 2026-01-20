import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity('order_addresses')
export class OrderAddressesEntity extends AbstractEntity {
    constructor(data?: Partial<OrderAddressesEntity>){
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
    email:string

    @Column({nullable:true})
    country:string

    @Column({nullable:true})
    state:string

    @Column({nullable:true})
    city:string

    @Column({nullable:true})
    address:string

    @Column()
    order_id:number


}
