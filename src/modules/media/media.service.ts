import { Injectable } from '@nestjs/common';
import { Multer } from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaFileEntity } from './entities/file.entity';
import { MediaFolderEntity } from './entities/folder.entity';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(MediaFileEntity)   private fileRepo: Repository<MediaFileEntity>,
        @InjectRepository(MediaFolderEntity)   private folderRepo: Repository<MediaFolderEntity>,
    ){}

    async saveFile(file: Multer.File, folder_id, user_id) {
        const entity = this.fileRepo.create({
            user_id: user_id,
            name: file.filename,
            alt: file.filename,
            folder_id: folder_id,
            mime_type: file.mimetype,
            size: file.size,
            url: file.path.replace(/\\/g, '/'), // fix cho Windows
        });

        return this.fileRepo.save(entity);
    }

    uploadFolder(folder_name,parent_id,user_id){
        const entity = this.folderRepo.create({
            user_id:user_id,
            name:folder_name,
            slug:folder_name,
            parent_id:parent_id,
        });

        return this.folderRepo.save(entity);
    }
}
