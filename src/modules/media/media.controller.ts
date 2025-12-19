import { Controller, Get, Post, Body, UploadedFiles, FileTypeValidator, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor ,FilesInterceptor} from '@nestjs/platform-express';
import { ParseFilePipeWithUnlink } from './parse-file.pipe';
import { Multer } from 'multer';
import { Public } from '@/decorators/public.decorators';
import * as fs from 'fs';
import * as path from 'path';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post('uploadFile')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadFile(@Body('user_id') user_id: number,@Body('folderName') folderName: string,@UploadedFile() file: Multer.File) {
        const saved = await this.mediaService.saveFile(file, folderName , user_id)
        return {
            message: 'Uploaded successfully',
            saved,
        };
    }

    @Post('uploadFolder')
    async uploadFolder(
        @Body('user_id') user_id: number,
        @Body('folderName') folderName: string,
        @Body('parent') parent?: string,
    ) {
        if (!folderName) {
            return { error: 'folderName is required' };
        }

        const uploadRoot = path.join(process.cwd(), 'uploads');
        const folderPath = parent
        ? path.join(uploadRoot, parent, folderName)
        : path.join(uploadRoot, folderName);

        // Kiểm tra nếu folder chưa tồn tại → tạo
        if (!fs.existsSync(folderPath)) {
            let parent_id = 0;
            const saved = await this.mediaService.uploadFolder(folderName, parent_id , user_id)
            fs.mkdirSync(folderPath, { recursive: true });
            return { message: 'Folder created', path: folderPath };
        }
        
        return { message: 'Folder already exists', path: folderPath };
    }

    @Public()
    @Get()
    async getMedia() {
        return this.mediaService.getMedia()
    }
    
}
