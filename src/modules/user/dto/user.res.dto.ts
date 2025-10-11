import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResDto {
	@StringField()
	@Expose()
	id: string;

    @StringField()
	@Expose()
	email: string;

	@StringField()
	@Expose()
	username: string;

	/*
	@StringField()
	@Expose()
	password: string;
*/
	@StringField()
	@Expose()
	avatar_id: string;
	
	@StringField()
	@Expose()
	first_name: string;

	@StringField()
	@Expose()
	last_name: string;

	@NumberField()
	@Expose()
	isActive: number;
}
