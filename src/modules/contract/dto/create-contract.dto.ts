import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum STATUS {
    ACTIVE ="active",
    EXPIRED = "expired",
    TERMINATED = "terminated",
    PENDING = "pending",
}

export class CreateContractDto {
     @IsString()
    @IsNotEmpty()
    contract_code: string;

    // ISO date string: "2026-01-01"
    @IsDateString()
    start_date: string;

    @IsDateString()
    end_date: string;

    @IsString()
    @Matches(/^\d+(\.\d{1,2})?$/, {
        message: 'royalty_percent must be a valid decimal with max 2 decimal places',
    })
    royalty_percent: string;

    @IsString()
    @Matches(/^\d+(\.\d{1,2})?$/, {
        message: 'marketing_fee_percent must be a valid decimal with max 2 decimal places',
    })
    marketing_fee_percent: string;

    @IsOptional()
    @IsEnum(STATUS)
    payment_status?: STATUS;

    @IsOptional()
    @IsString()
    contract_file_url?: string;

    // relation
    @Type(() => Number)
    @IsNumber()
    franchise_id: number;
    }
