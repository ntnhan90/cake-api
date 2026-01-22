import {StringField, NumberField, DateField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DiscountResDto {
    @Expose()
    id: number;

    @StringField()
    @Expose()
    title: string;

    @StringField()
    @Expose()
    code: string;

    @DateField()
    start_date:Date

    @DateField()
    end_date:Date

    @NumberField()
    quantity:number

    @NumberField()
    total_used:number

    @StringField()
    @Expose()
    value: string;

    @StringField()
    @Expose()
    type: string;

    @NumberField()
    can_use_with_promotion:number

    @StringField()
    @Expose()
    type_option: string;

    @StringField()
    @Expose()
    target: string;

    @NumberField()
    display_at_checkout:number
}
