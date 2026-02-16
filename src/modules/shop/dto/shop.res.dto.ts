import {StringField,NumberField} from '@/decorators/field.decorators';
import { Optional } from '@nestjs/common';
import { Exclude, Expose ,Transform} from 'class-transformer';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer'
import { FranchiseResDto } from 'src/modules/franchise/dto/franchise.res.dto';
@Exclude()
export class ShopResDto {
    @NumberField()
	@Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    address: string

    @Expose()
    city: string

    @Expose()
    postal_code: string

    @Expose()
    is_active: number

    @Expose()
    status: string

    @Expose()
    @Type(() => FranchiseResDto)
    franchise: FranchiseResDto
}