import {IsArray,IsInt,IsOptional,IsString,ArrayNotEmpty,} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFranchiseDto {
    @IsString()
    company_name: string;

    @IsString()
    tax_code: string;

    @IsString()
    owner_name: string;

    @IsString()
    email: string;

    @IsString()
    tax_amount: string;

    @IsString()
    phone: string;
}
