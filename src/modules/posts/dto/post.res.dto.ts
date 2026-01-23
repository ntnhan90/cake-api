import {StringField,NumberField} from '@/decorators/field.decorators';
import { Optional } from '@nestjs/common';
import { Exclude, Expose ,Transform} from 'class-transformer';
import { IsString } from 'class-validator';
import { TagsResDto } from 'src/modules/tags/dto/tags.res.dto';
import { CategoryResDto } from 'src/modules/categories/dto/category.res.dto';
@Exclude()
export class PostResDto{
    @NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	@StringField()
	@Expose()
	slug: string;
	
	@Optional()
    @IsString()
	@Expose()
	description?: string;

    @Optional()
    @IsString()
	@Expose()
	content?: string;

    @NumberField()
	@Expose()
	user_id: number;

    @NumberField()
	@Expose()
	is_featured: number;

    @NumberField()
	@Expose()
	views: number;
    
    @Optional()
    @IsString()
	@Expose()
	image?: string;

	@StringField()
	@Expose()
	status: string;
    
	@Expose()
	@Transform(({ obj }) =>
		Array.isArray(obj.tags)
		? obj.tags.map(tag => ({
			id: tag.id,
			name: tag.name,
			}))
		: [],
	)
	tags: TagsResDto[];

	@Expose()
	@Transform(({ obj }) =>
	Array.isArray(obj.categories)
		? obj.categories.map(category => ({
			id: category.id,
			name: category.name,
		}))
		: [],
	)
	categories: CategoryResDto[];
}