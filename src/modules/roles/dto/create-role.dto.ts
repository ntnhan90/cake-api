import {
  StringField,
  NumberField,
} from '@/decorators/field.decorators';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateRoleDto {
    @StringField()
    @IsNotEmpty()
    name:string

    @IsOptional()
    @IsString()
    description?:string
    
    @NumberField()
    is_default:number	

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    permissionIds?: number[];
}
