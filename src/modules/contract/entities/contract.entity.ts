import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,OneToOne, JoinColumn} from "typeorm";
import { FranchiseEntity } from 'src/modules/franchise/entities/franchise.entity';

export enum STATUS {
    ACTIVE ="active",
    EXPIRED = "expired",
    TERMINATED = "terminated",
    PENDING = "pending",
}

@Entity('contracts')
export class ContractEntity extends AbstractEntity {
    constructor(data?: Partial<ContractEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    contract_code:string

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    royalty_percent:string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2,
    })
    marketing_fee_percent:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.PENDING,
    })
    payment_status:STATUS

    @Column({ type: 'text' , nullable:true})
    contract_file_url:string

    // 🔥 FK
    @OneToOne(() => FranchiseEntity, franchise => franchise.contract)
    @JoinColumn() // 👈 bảng contracts sẽ giữ franchise_id
    franchise: FranchiseEntity;
}
