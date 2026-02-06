import {NumberField, StringField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';
import { STATUS, PAYMENT_STATUS } from '../entities/order.entity';
@Exclude()
export class OrdersResDto {
    @Expose()
    id: number;

    @StringField()
    @Expose()
    code: string;

    @NumberField()
    @Expose()
    customer_id: number;

    @NumberField()
    @Expose()
    shipping_option: number;

    @StringField()
    @Expose()
    status: STATUS;

    @Expose()
    total_amount: string;

    @Expose()
    tax_amount: string;

    @NumberField()
    @Expose()
    shipping_amount: string;

    @StringField()
    @Expose()
    note: string;

    @StringField()
    @Expose()
    coupon_code: string;

    @NumberField()
    @Expose()
    discount_amount: string;

    @Expose()
    sub_amount: string;

    @Expose()
    payment_status: PAYMENT_STATUS;
    
    @Expose()
    payment_method: string
}
