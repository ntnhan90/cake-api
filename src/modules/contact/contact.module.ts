import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { ContactRepository } from './repo/contact.repo';
@Module({
    imports: [TypeOrmModule.forFeature([ContactEntity])],
    controllers: [ContactController],
    providers: [ContactService,ContactRepository],
})
export class ContactModule {}
