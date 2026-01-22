import {StringField,NumberField,} from '@/decorators/field.decorators';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
export class CreateDiscountDto {

    @StringField()
    @IsNotEmpty()
    title:string

    @StringField()
    @IsNotEmpty()
    code:string

    @StringField()
    start_date:string

    @StringField()
    end_date:string

    @NumberField()
    quantity:number	

    @NumberField()
    total_used:number	

    @StringField()
    value:string

    @StringField()
    type:string

    @NumberField()
    can_use_with_promotion:number

     @StringField()
    type_option:string

    @StringField()
    target:string

    @NumberField()
    display_at_checkout:number
}
