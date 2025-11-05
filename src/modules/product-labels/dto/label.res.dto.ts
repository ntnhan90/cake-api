import {
  StringField,
} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LabelsResDto {
    @Expose()
    id: string;

    @StringField()
    @Expose()
    name: string;

    @StringField()
    @Expose()
    color: string;

}
