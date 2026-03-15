import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity('customer_addresses')
@Index(['customer_id'])
export class CustomerAddressEntity extends AbstractEntity {
  constructor(data?: Partial<CustomerAddressEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ nullable: true, length: 100 })
  country: string;

  @Column({ nullable: true, length: 100 })
  state: string;

  @Column({ nullable: true, length: 100 })
  city: string;

  @Column({ nullable: true, length: 255 })
  address: string;

  @Column({ nullable: true, length: 20 })
  zip_code: string;

  @Column({ type: 'tinyint', default: 0 })
  is_default: number;

  @Column()
  customer_id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}