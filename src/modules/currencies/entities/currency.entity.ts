import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity('currencies')
export class CurrencyEntity extends AbstractEntity {
    constructor(data?: Partial<CurrencyEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    symbol:string

    @Column({default:0})
    is_prefix_symbol:number

    @Column({default:0, nullable:true})
    decimals:number

    @Column({default:0, nullable:true})
    order:number

    @Column({default:0})
    default:number

    @Column({default:1})
    exchange_rate:number
}
