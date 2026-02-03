import {IsArray,IsInt,IsOptional,IsString,ArrayNotEmpty,} from 'class-validator';
import { Type } from 'class-transformer';
import { STATUS, PAYMENT_STATUS } from '../entities/order.entity';

export class CreateOrderDto {
    @IsOptional()
    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    shipping_method: string;

    @IsString()
    status: STATUS;

    @IsString()
    total_amount: string;

    @IsString()
    tax_amount: string;

    @IsOptional()
    @IsString()
    shipping_amount: string;

    @IsString()
    sub_amount: string;

    @IsString()
    payment_status: PAYMENT_STATUS;
}
