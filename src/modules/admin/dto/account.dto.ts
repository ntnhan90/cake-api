import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AccountResDto {
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
    avatar_id: string;
}
