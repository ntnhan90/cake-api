import { PartialType } from '@nestjs/swagger';
import { CreateProductTagDto } from './create-product-tag.req.dto';

export class UpdateProductTagDto extends PartialType(CreateProductTagDto) {}
