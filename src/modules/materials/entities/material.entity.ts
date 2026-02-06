import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany,} from "typeorm";
import { Expose } from 'class-transformer';

@Entity('materials')
export class MaterialEntity extends AbstractEntity{


    @PrimaryGeneratedColumn()
    id: number

    @Column()   
    name:string

    @Column()   
    sku:string

    @Column()   
    unit:string

    @Column()   
    category:string

    @Column()   
    cost_price:string

    @Column()   
    status:string
}
