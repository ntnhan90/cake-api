import {
  StringField,
  NumberField,
} from '@/decorators/field.decorators';
import { IsString, IsOptional } from 'class-validator';
export class CreateFaqCateDto {
    @StringField()
    name:string
    
    @NumberField()
    order:number
    
    @IsOptional()
    @IsString()
    description:string

    @StringField()
    status:string
}
