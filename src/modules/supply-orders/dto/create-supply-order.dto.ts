import {IsArray,IsInt,IsOptional,IsString,ArrayNotEmpty, IsDate,} from 'class-validator';
import { STATUS } from '../entities/supply-order.entity';

export class CreateSupplyOrderDto {
    @IsInt()
    shop_id:number

    @IsDate()
    order_date:Date

    @IsString()
    status:string

    @IsString()
    total_cost:string
}
