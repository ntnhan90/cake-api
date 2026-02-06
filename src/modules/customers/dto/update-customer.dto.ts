import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, IsDate ,IsString,IsInt ,IsNumber,IsArray,ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
     @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dob?: Date | null;

    // liên kết tới CustomerAddressEntity
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateCustomerAddressDto)
    addresses?: UpdateCustomerAddressDto[];
}

export class UpdateCustomerAddressDto {
  @IsOptional()
  @IsNumber()
  id?: number; // có id => update, không có => create

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsOptional()
  @IsInt()
  is_default?: number;

}
