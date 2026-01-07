import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class faqCateResDto {
	@NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	@NumberField()
	@Expose()
	order:number

	@StringField()
	@Expose()	
	description:string


	@StringField()
	@Expose()
	status:string
}
