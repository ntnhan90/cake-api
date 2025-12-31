import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  Body,
  Get
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor ,FilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import * as fs from 'fs';
import { generateRandomFilename } from '@/utils/helpers';
import { Public } from '@/decorators/public.decorators';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}
    
    @Post('uploadFile')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile( 
        @UploadedFile() file: Express.Multer.File,
        @Body('folder_id') folderId: number,
        @Body('user_id') user_Id: number
    ) {
        return this.mediaService.uploadFile(file, folderId,user_Id);
    }
    /*
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('folder_id') folderId: number
    ) {
        return this.mediaService.uploadFile(file, folderId);
    }*/

    @Post('uploadFolder')
    async uploadFolder(
        @Body('user_id') user_id: number,
        @Body('name') name: string,
        @Body('parent_id') parent_id?: number,
    ) {
        return this.mediaService.uploadFolder(user_id, name , parent_id)
    }

    @Public()
    @Get()
    async getMedia() {
        return this.mediaService.getMedia()
    }
    
}
