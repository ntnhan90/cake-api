import {
  StringField,
  NumberField,
} from '@/decorators/field.decorators';

export class CreateProductLabelDto {
    @StringField()
    name: string;
    
    @StringField()
    color: string;

    @StringField()
    status: string;
}
