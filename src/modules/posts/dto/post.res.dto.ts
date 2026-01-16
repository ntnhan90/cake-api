import {StringField,NumberField} from '@/decorators/field.decorators';
import { Optional } from '@nestjs/common';
import { Exclude, Expose ,Transform} from 'class-transformer';
import { IsString } from 'class-validator';

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
		obj.tags?.map(tag => ({
			tag_id: tag.id,
			tag_name: tag.name,
		})) ?? [],
	)
	tags: {
		tag_id: number;
		tag_name: string;
	}[];

	// 🔥 QUAN TRỌNG NHẤT
	@Expose()
	@Transform(({ obj }) =>
		obj.postCategories?.map(pc => ({
		id: pc.category.id,
		name: pc.category.name,
		slug: pc.category.slug,
		})) ?? [],
	)
	categories: {
		id: number;
		name: string;
		slug: string;
	}[];
}