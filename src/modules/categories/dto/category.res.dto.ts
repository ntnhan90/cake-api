import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional,IsNotEmpty,IsString } from 'class-validator';

@Exclude()
export class CategoryResDto {
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
	description?: string;

	@StringField()
	@Expose()
	status: string;

}
