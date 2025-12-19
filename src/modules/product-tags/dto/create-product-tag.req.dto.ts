import {
  StringField,
} from '@/decorators/field.decorators';

export class CreateProductTagDto {
    @StringField()
    name:string
    
    @StringField()
    slug:string	

    @StringField()
    description:string	
    
    @StringField()
    status:string
}

