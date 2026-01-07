import { PartialType } from '@nestjs/swagger';
import { CreateFaqCateDto } from './create-faq-cate.dto';

export class UpdateFaqCateDto extends PartialType(CreateFaqCateDto) {}
