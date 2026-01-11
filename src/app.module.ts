import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import { PostsModule } from './modules/posts/posts.module';
import generateModulesSet from './utils/module-set';

@Module({
  imports: generateModulesSet(),
})
export class AppModule {}
