import {StringField,NumberField,} from '@/decorators/field.decorators';
import { IsOptional,IsString } from 'class-validator';

export class CreateProductCollectionDto {
    @StringField()
    name:string
    
    @StringField()
    slug:string

    @IsOptional()
    @IsString()
    description:string
    
    @IsOptional()
    @IsString()
    image:string

    @NumberField()
    is_featured:number

    @StringField()
    status:string
}
