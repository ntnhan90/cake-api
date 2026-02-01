import {IsArray,IsInt,IsOptional,IsString,ArrayNotEmpty,} from 'class-validator';
import { Type } from 'class-transformer';
import { STATUS, PAYMENTSTATUS } from '../entities/order.entity';

export class CreateOrderDto {
    @IsString()
    code: string;

    @IsString()
    shipping_method: string;

    @IsString()
    status: STATUS;

    @IsString()
    amount: string;

    @IsString()
    tax_amount: string;

    @IsString()
    shipping_amount: string;

    @IsString()
    sub_total: string;

    @IsString()
    payment_status: PAYMENTSTATUS;
}
