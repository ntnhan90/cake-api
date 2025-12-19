import {StringField,NumberField} from '@/decorators/field.decorators';

export class CreateProductCategoryDto {
    @StringField()
    name:string

   @StringField()   
    slug:string

    @NumberField()
    parent_id:number

    @StringField()
    description:string

    @StringField()
    status:string

    @NumberField()
    order:number

    @StringField()
    image:string

    @NumberField()
    is_featured:number
}
