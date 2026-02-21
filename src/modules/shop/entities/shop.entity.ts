import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn} from "typeorm";
import { FranchiseEntity } from 'src/modules/franchise/entities/franchise.entity';

export enum STATUS {
    ACTIVE ="active",
    PENDING = "pending",
    CLOSE = "close"
}

@Entity('shop')
export class ShopEntity extends AbstractEntity {
    constructor(data?: Partial<ShopEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column({ type: 'text' , nullable:true})
    address:string

    @Column()
    city:string

    @Column()
    postal_code:string

    @Column()
    is_active:number

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PENDING,
    })
    status:STATUS

    // 🔥 Many shops thuộc 1 franchise
    @ManyToOne(() => FranchiseEntity, franchise => franchise.shops, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'franchise_id' })
    franchise: FranchiseEntity;
}
