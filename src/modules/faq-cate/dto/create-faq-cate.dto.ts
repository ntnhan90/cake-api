import {
  StringField,
  NumberField,
} from '@/decorators/field.decorators';
export class CreateFaqCateDto {
    @StringField()
    name:string
    
    @NumberField()
    order:number
    
    @StringField()
    description:string

    @StringField()
    status:string
}
