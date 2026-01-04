import {StringField,} from '@/decorators/field.decorators';

export class CreateContactDto {
    @StringField()
    email: string;
    
    @StringField()
    name:string;
    
    
    @StringField()
    phone:string
    
    @StringField()
    address:string
    
    @StringField()
    content:string

    @StringField()
    status:string
}
