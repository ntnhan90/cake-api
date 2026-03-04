import {StringField,} from '@/decorators/field.decorators';

export class CreateWarehouseDto {
    
    @StringField()
    name:string;
    
    
    @StringField()
    country:string
    
    @StringField()
    address:string
    
    @StringField()
    location:string

    @StringField()
    status:string
}
