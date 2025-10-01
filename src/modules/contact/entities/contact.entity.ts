import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum STATUS {
    UNREAD = "unread",
    READ = "read",
}

@Entity('contacts')
export class ContactEntity extends AbstractEntity  {
    constructor(data?: Partial<ContactEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email:string

    @Column()
    name:string	

    @Column()
    phone:string

    @Column()
    address:string

    @Column('text')
    content:string	

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.UNREAD,
    })
    status:string	
}
