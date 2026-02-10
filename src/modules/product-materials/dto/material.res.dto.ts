import {StringField,NumberField} from '@/decorators/field.decorators';
import { Optional } from '@nestjs/common';
import { Exclude, Expose ,Transform} from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class MaterialResDto{
    @NumberField()
	@Expose()
    id: number
    
    @StringField()
	@Expose()   
    name:string
    
    @StringField()
	@Expose()  
    sku:string
    
    @StringField()
	@Expose()
    unit:string
    
    @StringField()
	@Expose()
    category:string
    
    @StringField()
	@Expose()   
    cost_price:string
    
    @StringField()
	@Expose()
    status:string
}