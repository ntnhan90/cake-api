import {StringField, NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ContactResDto {
	@NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	email: string;

	@StringField()
	@Expose()
	name:string;


	@StringField()
	@Expose()	
	phone:string

	@StringField()
	@Expose()
	address:string

	@StringField()
	@Expose()
	content:string

    @StringField()
	@Expose()
	status:string

}