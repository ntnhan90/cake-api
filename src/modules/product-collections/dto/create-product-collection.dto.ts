import {StringField,NumberField,} from '@/decorators/field.decorators';

export class CreateProductCollectionDto {
    @StringField()
    name:string
    
    @StringField()
    slug:string
    
    @StringField()
    description:string
    
    @StringField()
    image:string
    
    @NumberField()
    is_featured:number

    @StringField()
    status:string
}
