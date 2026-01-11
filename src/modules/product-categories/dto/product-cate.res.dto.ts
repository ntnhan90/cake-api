import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductCateResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	@StringField()
	@Expose()
	slug: string;
	
    @NumberField()
    @Expose()
    parent_id: number;

    @StringField()
	@Expose()
	description: string;

	@StringField()
	@Expose()
	status: string;

}
