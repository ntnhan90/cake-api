import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,OneToOne} from "typeorm";
import { ContractEntity } from './contract.entity';

@Entity('franchisees')
export class FranchiseEntity extends AbstractEntity {
    constructor(data?: Partial<FranchiseEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    company_name:string

    @Column({unique:true})
    tax_code: string;

    @Column()
    owner_name: string;

    @Column({ unique:true})
    email: string;

    @Column()
    phone: string;

    @OneToOne(() => ContractEntity, contract => contract.franchise)
    contract: ContractEntity;
}
