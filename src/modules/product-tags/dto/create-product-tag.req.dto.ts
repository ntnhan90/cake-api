import {StringField,} from '@/decorators/field.decorators';
import { IsOptional,IsNotEmpty,IsString } from 'class-validator';
export class CreateProductTagDto {
    @IsNotEmpty()
    @StringField()
    name:string
    
    @StringField()
    slug:string	

    @IsOptional()
    @IsString()
    description?: string;

    @StringField()
    status:string
}

