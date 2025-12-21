import { Injectable } from '@nestjs/common';
import { Multer } from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaFileEntity } from './entities/file.entity';
import { MediaFolderEntity } from './entities/folder.entity';
import { MediaTreeType } from 'src/types/media.type';

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

    uploadFolder(folder_name,parent_id,user_id,slug){
        const entity = this.folderRepo.create({
            user_id:user_id,
            name:folder_name,
            slug:slug,
            parent_id:parent_id,
        });

        return this.folderRepo.save(entity);
    }

    async getMedia(){
        const tree: MediaTreeType = { '0': []}

        const folders = await this.folderRepo
        .createQueryBuilder('f')
        .leftJoin(
            MediaFolderEntity,
            'p',
            'p.id = f.parent_id',
        )
        .select([
            'f.id AS id',
            'f.name AS name',
            'f.parent_id AS parent_id',
            'p.name AS parent_name',
        ])
        .orderBy('f.name', 'ASC')
        .getRawMany();

        const files = await this.fileRepo.find({
            order: { name: 'ASC' },
        });

        // 1️⃣ Init key cho mỗi folder
        folders.forEach(folder => {
            tree[folder.id.toString()] = [];
        });

        // 2️⃣ Folder
        folders.forEach(folder => {
            const parentKey =  folder.parent_id && folder.parent_id > 0
                ? folder.parent_id.toString()
                : '0';

            if (!tree[parentKey]) {
                tree[parentKey] = [];
            }

            tree[parentKey].push({
                id: folder.id,
                name: folder.name,
                type: 'folder',
            });
        });

        // 3️⃣ File
        files.forEach(file => {
            const key = file.folder_id && file.folder_id > 0
                ? file.folder_id.toString()
                : '0';

            if (!tree[key]) {
                tree[key] = [];
            }

            tree[key].push({
                id: file.id,
                name: file.name,
                type: 'file',
                url: file.url,
            });
        });

        // 4️⃣ Sort
        Object.keys(tree).forEach(key => {
            tree[key].sort((a, b) => {
            if (a.type === b.type) {
                return a.name.localeCompare(b.name);
            }
            return a.type === 'folder' ? -1 : 1;
            });
        });

        return tree;
    }

}
