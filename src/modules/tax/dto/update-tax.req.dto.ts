import { PartialType } from '@nestjs/swagger';
import { CreateTaxDto } from './create-tax.req.dto';

export class UpdateTaxDto extends PartialType(CreateTaxDto) {}
