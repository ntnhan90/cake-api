import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

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
	
    @StringField()
	@Expose()
	description?: string;

    @StringField()
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
    
    @StringField()
	@Expose()
	image?: string;

	@StringField()
	@Expose()
	status: string;
    
	@Expose()
    tags: {
        tag_id: number;
        tag_name: string;
    }[];
}