import { PartialType } from '@nestjs/swagger';
import { CreateFaqsDto } from './create-faq.dto';

export class UpdateFaqsDto extends PartialType(CreateFaqsDto) {}
