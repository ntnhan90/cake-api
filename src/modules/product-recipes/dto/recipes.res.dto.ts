import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RecipeResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
    @Expose()
    product_id:string

    @NumberField()
    @Expose()
    quantity:number
}
