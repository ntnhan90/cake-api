import {DateField, NumberField, StringField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class SupplyOrdersResDto {
    @Expose()
    id: number;

    @NumberField()
    @Expose()
    shop_id: number;

    @DateField()
    @Expose()
    order_date: Date;

    @Expose()
    status: string;

    @NumberField()
    @Expose()
    total_cost: string;

}
