import {StringField,NumberField} from '@/decorators/field.decorators';
import { Optional } from '@nestjs/common';
import { Exclude, Expose ,Transform} from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class FranchiseResDto {
    @NumberField()
    @Expose()
    id: number

    @StringField()
    @Expose()
    company_name: string

    @StringField()
    @Expose()
    tax_code: string

    @StringField()
    @Expose()
    owner_name: string

     @StringField()
    @Expose()
    email: string

    @StringField()
    @Expose()
    phone: string
}