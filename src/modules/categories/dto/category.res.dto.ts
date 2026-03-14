import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose ,Transform} from 'class-transformer';

@Exclude()
export class CategoryResDto {
	@NumberField()
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

	@NumberField()
    @Expose()
    is_featured: number;

	@StringField()
	@Expose()
	image: string;

	@NumberField()
    @Expose()
    is_default: number;

    @StringField()
	@Expose()
	description?: string;

	@StringField()
	@Expose()
	status: string;

	@Expose()
	@Transform(({ obj }) => !!obj.deleted_at)
	deleted: boolean;
}
