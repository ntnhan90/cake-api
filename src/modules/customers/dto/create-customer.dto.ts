import {StringField,NumberField, DateField,} from '@/decorators/field.decorators';
import { IsEnum, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export enum CUSTOMER_STATUS {
    ACTIVATED = "activated",
    DRAFT = "draft",
}

export class CreateCustomerDto {
    @StringField()
    @IsNotEmpty()
    email:string

    @StringField()
    @IsNotEmpty()
    name:string

    @StringField()
    password:string

    @IsOptional()
    @IsString()
    avatar:string

    @DateField()
    dob:Date

    @StringField()
    phone:string	

    @IsOptional()
    @IsDate()
    confirmed_at?: Date;

    @IsEnum(CUSTOMER_STATUS)
    status?: CUSTOMER_STATUS;
}
