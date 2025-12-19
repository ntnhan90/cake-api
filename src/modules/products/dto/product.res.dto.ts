import {StringField,NumberField, DateField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoleResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
    @Expose()
    name:string

    @StringField()
    @Expose()
    slug:string

    @StringField()
    @Expose()
    description:string

    @StringField()
    @Expose()
    content:string

    @StringField()
    @Expose()
    status:string

    @StringField()
    @Expose()
    image:string

    @StringField()
    @Expose()
    sku:string
    
    @NumberField()
    @Expose()
    order:number

    @NumberField()
    @Expose()
    is_featured:number	

    @NumberField()
    @Expose()
    price:number

    @NumberField()
    @Expose()
    sale_price:number

    @DateField()
    @Expose()
    start_date: Date

    @DateField()
    @Expose()
    end_date: Date;

    @NumberField()
    @Expose()
    length:number

    @NumberField()
    @Expose()
    wide:number

    @NumberField()
    @Expose()
    weight:number

    @NumberField()
    @Expose()
    height:number

    @NumberField()
    @Expose()
    views:number

}
