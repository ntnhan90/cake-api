import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CurrencyResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	title: string;

	@NumberField()
	@Expose()
	is_prefix_symbol:number

	@NumberField()
	@Expose()	
	decimals:number


	@NumberField()
	@Expose()
	default:number

	@NumberField()
	@Expose()
	exchange_rate:number

}
