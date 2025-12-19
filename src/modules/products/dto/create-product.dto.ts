import {
  StringField,
  NumberField,
  DateField
} from '@/decorators/field.decorators';

export class CreateProductDto {
    @StringField()
    name:string

    @StringField()
    slug:string

    @StringField()
    description:string

    @StringField()
    content:string

    @StringField()
    status:string

    @StringField()
    image:string

    @StringField()
    sku:string
    
    @NumberField()
    order:number

    @NumberField()
    is_featured:number	

    @NumberField()
    price:number

    @NumberField()
    sale_price:number

    @DateField()
    start_date: Date

    @DateField()
    end_date: Date;

    @NumberField()
    length:number

    @NumberField()
    wide:number

    @NumberField()
    weight:number

    @NumberField()
    height:number

    @NumberField()
    views:number
}
