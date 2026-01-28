import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, IsDate ,IsString} from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
     @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dob?: Date | null;
}
