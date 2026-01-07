import { Module } from '@nestjs/common';
import { FaqCateService } from './faq-cate.service';
import { FaqCateController } from './faq-cate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqCateEntity } from './entities/faq-cate.entity';
import { FaqCateRepository } from './repo/faqCate.repo';

@Module({
    imports: [TypeOrmModule.forFeature([FaqCateEntity])],
    controllers: [FaqCateController],
    providers: [FaqCateService, FaqCateRepository],
})
export class FaqCateModule {}
