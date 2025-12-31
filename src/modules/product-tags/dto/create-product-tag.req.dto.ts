import {StringField,} from '@/decorators/field.decorators';
import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator'
export class CreateProductTagDto {
    @IsNotEmpty()
    @StringField()
    name:string
    
    @StringField()
    slug:string	

    @IsOptional()
    @StringField()
    description?: string;

    @StringField()
    status:string
}

