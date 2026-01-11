import {StringField,NumberField} from '@/decorators/field.decorators';
import { IsOptional,IsNotEmpty,IsString } from 'class-validator';

export class CreatePostDto {
    @StringField()
    name:string

    @StringField()   
    slug:string

    @IsOptional()
    @IsString()
    description:string

    @IsOptional()
    @IsString()
    content:string

    @NumberField()
    user_id:number

    @NumberField()
    is_featured:number

    @IsOptional()
    @IsString()
    image:string

    @StringField()
    status:string

    @NumberField()
    view:number
}
