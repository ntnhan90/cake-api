import {
  StringField,
  NumberField,
} from '@/decorators/field.decorators';

export class CreateRoleDto {
    @StringField()
    name:string

    @StringField()
    slug:string

    @StringField()
    permissions:string

    @StringField()
    description:string
    
    @NumberField()
    is_default:number	
}
