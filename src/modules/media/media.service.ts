import { Injectable,NotFoundException,BadRequestException } from '@nestjs/common';
import { Multer } from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaFileEntity } from './entities/file.entity';
import { MediaFolderEntity } from './entities/folder.entity';
import { MediaTreeType } from 'src/types/media.type';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(MediaFileEntity)   private fileRepo: Repository<MediaFileEntity>,
        @InjectRepository(MediaFolderEntity)   private folderRepo: Repository<MediaFolderEntity>,
    ){}


    async uploadFile(
        file: Express.Multer.File,
        folderId: number,
        userId:number
    ) {
        let uploadDir = path.join(process.cwd(), 'uploads');
        if (folderId !== 0) {
            const folder = await this.folderRepo.findOne({
                where: { id: folderId },
            });

            if (!folder) {
                throw new BadRequestException('Folder not found');
            }

            uploadDir = path.join(uploadDir, folder.name);
        }
         
        console.log("uploadDir ,", uploadDir );
        // tạo folder nếu chưa có
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const finalPath = path.join(uploadDir, file.originalname);

        // move file từ tmp → folder thật
        fs.renameSync(file.path, finalPath);

        /*
        const entity = this.fileRepo.create({
            user_id: userId,
            name: file.filename,
            alt: file.filename,
            folder_id: folderId,
            mime_type: file.mimetype,
            size: file.size,
            url: file.path.replace(/\\/g, '/'), // fix cho Windows
        });

        return this.fileRepo.save(entity);
        */
        return file.path;
    }

    async uploadFolder(user_id, name , parent_id){
       // return dto;
        const slug = name;
        let pathDb: string;
        
        if (parent_id) {
            const parent = await this.folderRepo.findOne({
                where: { id: parent_id },
            });

            if (!parent) {
                throw new NotFoundException('Parent folder not found');
            }
            pathDb = `${parent.path}/${slug}`;
        } else {
            pathDb = `${slug}`;
        }
          // 🔹 2. Tạo folder vật lý
        const uploadRoot = process.env.UPLOAD_ROOT || 'uploads';

        const physicalPath = path.join(uploadRoot, pathDb);
        // mkdir -p (recursive)
        fs.mkdirSync(physicalPath, { recursive: true });

        const entity = this.folderRepo.create({
            user_id: user_id,
            name:name,
            slug:slug,
            parent_id:parent_id,
            path: pathDb,
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
