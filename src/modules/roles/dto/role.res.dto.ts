import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoleResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	@StringField()
	@Expose()
	slug: string;
	
	@StringField()
	@Expose()
	permissions: string;

    @StringField()
	@Expose()
	description: string;

    @NumberField()
	@Expose()
	is_default: number;

}
