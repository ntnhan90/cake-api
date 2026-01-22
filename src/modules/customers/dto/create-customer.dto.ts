import {StringField,NumberField, DateField,} from '@/decorators/field.decorators';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateCustomerDto {

    @StringField()
    @IsNotEmpty()
    email:string

    @StringField()
    @IsNotEmpty()
    name:string

    @StringField()
    password:string

    @StringField()
    avatar:string

    @DateField()
    dob:Date

    @StringField()
    phone:string	

    @DateField()
    confirmed_at:Date

    @StringField()
    status:string
}
