import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose,Type } from 'class-transformer';
import { IsOptional,IsDate} from 'class-validator';

@Exclude()
export class CustomerResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	@StringField()
	@Expose()
	email: string;

	@StringField()
	@Expose()
	password: string;
	
    @StringField()
	@Expose()
	avatar: string;

	@StringField()
	@Expose()
	phone: string;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	@Expose()
	dob?: Date;
	
	@StringField()
	@Expose()
	status: string;

}
