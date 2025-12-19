import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TaxResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	title: string;

	@NumberField()
	@Expose()
	percentage: number;
	
	@StringField()
	@Expose()
	status: string;

}
