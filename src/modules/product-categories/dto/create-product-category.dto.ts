import {StringField,NumberField} from '@/decorators/field.decorators';
import { IsOptional,IsNotEmpty,IsString , IsNumber} from 'class-validator';

export class CreateProductCategoryDto {
    @StringField()
    @IsOptional()
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

    @IsNumber()
    order:number

    @IsOptional()
    @IsString()
    image:string

    @NumberField()
    is_featured:number
}
