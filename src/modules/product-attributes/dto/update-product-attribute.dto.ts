import { PartialType } from '@nestjs/swagger';
import { CreateAttributeSetDto } from './create-product-attribute.dto';

export class UpdateProductAttributeDto extends PartialType(CreateAttributeSetDto) {}
