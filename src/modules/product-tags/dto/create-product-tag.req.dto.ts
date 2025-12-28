import {StringField,} from '@/decorators/field.decorators';
import { IsNotEmpty } from 'class-validator'
export class CreateProductTagDto {
    @IsNotEmpty()
    @StringField()
    name:string
    
    @StringField()
    slug:string	

    @StringField()
    description:string	
    
    @StringField()
    status:string
}

