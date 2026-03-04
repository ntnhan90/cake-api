import {StringField,NumberField, DateField,} from '@/decorators/field.decorators';
import {IsEnum,} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export enum STATUS {
    ACTIVE = "active",
    INACTIVE = "Inactive",
}

@Exclude()
export class WarehouseResDto {
	@NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	@StringField()
	@Expose()
	country:string

    @StringField()
	@Expose()
	location:string

	@StringField()
	@Expose()	
	address:string

	@IsEnum(STATUS)
    status?: string;
}