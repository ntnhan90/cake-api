import {
  StringField,
  NumberField,
} from '@/decorators/field.decorators';

export class CreateTaxDto {
    @StringField()
    title:string
    
    @NumberField()
    percentage:number	
    
    @StringField()
    status:string
}
