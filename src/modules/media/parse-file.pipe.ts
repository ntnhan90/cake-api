import { ParseFileOptions, ParseFilePipe , Injectable} from '@nestjs/common'
import { unlink } from 'fs/promises'
import { File as MulterFile } from 'multer';

@Injectable()
export class ParseFilePipeWithUnlink extends ParseFilePipe {
    constructor(options?: ParseFileOptions){
        super(options);
    }
    
    async transform(files: MulterFile[]): Promise<any> {
        return super.transform(files).catch(async (error) => {
            await Promise.all(
                files.map((file) => unlink(file.path))
            );
            throw error;
        });
    }
}
