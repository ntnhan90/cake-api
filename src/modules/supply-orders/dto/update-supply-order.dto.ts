import { PartialType } from '@nestjs/swagger';
import { CreateSupplyOrderDto } from './create-supply-order.dto';

export class UpdateSupplyOrderDto extends PartialType(CreateSupplyOrderDto) {}
