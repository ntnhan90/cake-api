import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { CustomerEntity } from './customer.entity';

@Entity('customer_addresses')
export class CustomerAddressEntity extends AbstractEntity {
  constructor(data?: Partial<CustomerAddressEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  zip_code: string;

  @Column({ default: 0 })
  is_default: number;

  // FK column
  @Index()
  @Column()
  customer_id: number;

  // Relation
  @ManyToOne(() => CustomerEntity, (customer) => customer.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}