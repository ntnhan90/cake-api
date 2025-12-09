import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import multer from 'multer'
import { UPLOAD_DIR } from '@/constants/other.constant';
import { generateRandomFilename } from '@/utils/helpers';
import * as fs from 'fs';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFileEntity } from './entities/file.entity';
import { MediaFolderEntity } from './entities/folder.entity';

const storage = multer.diskStorage({
    destination: ( req, file, callback) =>{
        const folderName = req.body.folderName;
        // gốc upload
        const uploadRoot = path.join(process.cwd(), 'upload');
        // nếu có folderName => tạo folder con
        const folderPath = folderName
        ? path.join(uploadRoot, folderName)
        : uploadRoot;
    
        
        // Tạo thư mục nếu chưa có
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, { recursive: true});
        }
    
        callback(null, folderPath)
    },
    filename:(req, file, callback) =>{
        const newFilename = generateRandomFilename(file.originalname)
        callback(null, newFilename)
    }
})

@Module({
    imports:[
        MulterModule.register({
            storage,
        }),
        TypeOrmModule.forFeature([MediaFileEntity, MediaFolderEntity])
    ],
    controllers: [MediaController],
    providers: [MediaService],
})
export class MediaModule {
    constructor(){
        if(!existsSync(UPLOAD_DIR)){
            mkdirSync(UPLOAD_DIR,{ recursive: true})
        }
    }
}
