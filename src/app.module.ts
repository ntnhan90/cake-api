import { Module } from '@nestjs/common';
import generateModulesSet from './utils/module-set';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ...generateModulesSet(),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'uploads'),
            serveRoot: '/uploads',
        }),
    ] 
        
})
export class AppModule {}
