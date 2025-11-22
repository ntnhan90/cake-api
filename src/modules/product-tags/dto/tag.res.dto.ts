import {StringField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TagsResDto {
    @Expose()
    id: number;

    @StringField()
    @Expose()
    name: string;

    @StringField()
    @Expose()
    color: string;

}
