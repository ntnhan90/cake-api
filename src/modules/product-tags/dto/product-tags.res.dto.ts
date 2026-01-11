import {StringField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductTagsResDto {
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
    description: string;

    @StringField()
    @Expose()
    status: string;
}
