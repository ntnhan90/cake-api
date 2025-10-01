//import { PostResDto } from '@/api/post/dto/post.res.dto';
//import { WrapperType } from '@/common/types/types';
import {StringField,} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResDto {
	@StringField()
	@Expose()
	id: string;

    @StringField()
	@Expose()
	email: string;

	@StringField()
	@Expose()
	username: string;

	@StringField()
	@Expose()
	image: string;

}
