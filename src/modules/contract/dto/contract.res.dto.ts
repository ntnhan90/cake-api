import {StringField,NumberField, DateField,} from '@/decorators/field.decorators';
import {IsEnum,} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { FranchiseEntity } from 'src/modules/franchise/entities/franchise.entity';

export enum PAYMENT_STATUS {
    ACTIVE ="active",
    EXPIRED = "expired",
    TERMINATED = "terminated",
    PENDING = "pending",
}

@Exclude()
export class ContractResDto {
	@NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	contract_code: string;

	@DateField()
	@Expose()
	start_date:Date

    @DateField()
	@Expose()
	end_date:Date

	@StringField()
	@Expose()	
	royalty_percent:string

	@StringField()
	@Expose()
	marketing_fee_percent:string

	@IsEnum(PAYMENT_STATUS)
    payment_status?: string;

    @StringField()
	@Expose()
	contract_file_url:string | null

    @Expose()
    franchise: {
        id: number;
        company_name: string;
        tax_code: string;
        email: string;
    };
}
