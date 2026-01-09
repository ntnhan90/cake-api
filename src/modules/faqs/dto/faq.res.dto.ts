import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose, Transform } from 'class-transformer';
export class FaqCateDto {
  id: number;
  name: string;
}

@Exclude()
export class FaqsResDto {
	@NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	question: string;

	@StringField()
	@Expose()
	answer:string

	@NumberField()
	@Expose()	
	category_id:number

	@StringField()
	@Expose()
	status:string
}
