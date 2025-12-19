import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PermissionResDto {
	@NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	@StringField()
	@Expose()
	description: string;
	
	@StringField()
	@Expose()
	module: string;

    @StringField()
	@Expose()
	path: string;

    @StringField()
	@Expose()
	method: string;
}
