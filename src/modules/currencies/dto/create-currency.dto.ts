import {
  StringField,
  NumberField,
} from '@/decorators/field.decorators';

export class CreateCurrencyDto {
    @StringField()
    title:string

    @NumberField()
    is_prefix_symbol:number

    @NumberField()
    decimals:number

    @NumberField()
    default:number

    @NumberField()
    exchange_rate:number
}
