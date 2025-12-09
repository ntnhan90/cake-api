import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { generateRandomFilename } from '@/utils/helpers';

export const multerConfig = {
    storage: diskStorage({
        destination: ( req, file, callback) =>{
             const folderName = req.body.folderName;

            if (!folderName) {
                return callback(new Error("folderName is required"), null);
            }

            const uploadRoot = path.join(process.cwd(),'upload');
            const folderPath = path.join(uploadRoot, folderName);
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
}