import { StringField, NumberField } from '@/decorators/field.decorators';
import { Exclude, Expose, Type,Transform } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';

@Exclude()
export class CustomerResDto {
  @NumberField()
  @Expose()
  id: number;

  @StringField()
  @Expose()
  name: string;

  @StringField()
  @Expose()
  email: string;

  @StringField()
  @Expose()
  avatar: string;

  @StringField()
  @Expose()
  phone: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Expose()
  dob?: Date | null;

  @StringField()
  @Expose()
  status: string;

  /* ================= RELATIONS ================= */
  @Expose()
  @Type(() => CustomerAddressResDto)
  addresses: CustomerAddressResDto[];
}

@Exclude()
export class CustomerAddressResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  country?: string;

  @Expose()
  state?: string;

  @Expose()
  city?: string;

  @Expose()
  address: string;

  @Expose()
  zip_code?: string;

  @Expose()
  is_default: number;
}
