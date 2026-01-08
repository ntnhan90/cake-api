import {StringField,NumberField,} from '@/decorators/field.decorators';
export class CreateFaqsDto {
    @StringField()
    question:string

    @StringField()
    answer:string

    @NumberField()
    category_id:number

    @StringField()
    status:string
}
