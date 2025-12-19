import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CollectionResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
    @Expose()
    name:string

    @StringField()
    @Expose()
    slug:string
    
    @StringField()
    @Expose()
    image:string
    
    @StringField()
    @Expose()
    is_featured:number
	
	@StringField()
	@Expose()
	status: string;

}
