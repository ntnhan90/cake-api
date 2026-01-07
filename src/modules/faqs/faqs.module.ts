import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsEntity } from './entities/faq.entity';
import { FaqsRepository } from './repo/faq.repo';

@Module({
    imports: [TypeOrmModule.forFeature([FaqsEntity])],
    controllers: [FaqsController],
    providers: [FaqsService,FaqsRepository],
})
export class FaqsModule {}
