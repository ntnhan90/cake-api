import {StringField,NumberField} from '@/decorators/field.decorators';
import { Optional } from '@nestjs/common';
import { Exclude, Expose ,Transform} from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class AttributeResDto{
    @NumberField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;
}