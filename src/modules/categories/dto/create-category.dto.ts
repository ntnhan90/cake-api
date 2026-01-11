import {StringField,NumberField} from '@/decorators/field.decorators';
import { IsOptional,IsNotEmpty,IsString } from 'class-validator';

export class CreateCategoryDto {
    @StringField()
    name:string

    @StringField()   
    slug:string

    @NumberField()
    parent_id:number

    @IsOptional()
    @IsString()
    description:string

    @StringField()
    status:string

    @NumberField()
    order:number

    @StringField()
    image:string

    @NumberField()
    is_featured:number

    @NumberField()
    is_default:number
}
