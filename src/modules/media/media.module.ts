import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFileEntity } from './entities/file.entity';
import { MediaFolderEntity } from './entities/folder.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UPLOAD_DIR } from '@/constants/other.constant';
import multer from 'multer'
import { generateRandomFilename } from '@/utils/helpers';
import { existsSync, mkdirSync } from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const newFilename = generateRandomFilename(file.originalname)
    cb(null, newFilename)
  },
})

@Module({
    imports:[
        TypeOrmModule.forFeature([MediaFileEntity, MediaFolderEntity]),
        MulterModule.register({
          storage,
        }),
    ],
    controllers: [MediaController],
    providers: [MediaService],
})

export class MediaModule {
  constructor() {
    if (!existsSync(UPLOAD_DIR)) {
      mkdirSync(UPLOAD_DIR, { recursive: true })
    }
  }
}
