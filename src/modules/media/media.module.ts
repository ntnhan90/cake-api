import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFileEntity } from './entities/file.entity';
import { MediaFolderEntity } from './entities/folder.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UPLOAD_DIR } from '@/constants/other.constant';
import { existsSync, mkdirSync } from 'fs'



@Module({
    imports:[
        TypeOrmModule.forFeature([MediaFileEntity, MediaFolderEntity]),
    ],
    controllers: [MediaController],
    providers: [MediaService],
})

export class MediaModule {}
