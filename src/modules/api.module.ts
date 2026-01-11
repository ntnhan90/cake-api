import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/roles.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductTagsModule } from './product-tags/product-tags.module';
import { ProductCollectionsModule } from './product-collections/product-collections.module';
import { ProductLabelsModule } from './product-labels/product-labels.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { ProfileModule } from './profile/profile.module';
import { MediaModule } from './media/media.module';
import { TaxModule } from './tax/tax.module';
import { PermissionModule } from './permission/permission.module';
import { FaqsModule } from './faqs/faqs.module';
import { FaqCateModule } from './faq-cate/faq-cate.module';
import { TagsModule } from './tags/tags.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  	imports: [
		AdminModule, 
		AuthModule,
		ContactModule,
		CurrenciesModule, 
		CustomersModule,
   	 	HealthModule, 
		HomeModule, 
		MediaModule,
		ProductCategoriesModule, 
		ProductTagsModule, 
		ProductCollectionsModule, 
		ProductLabelsModule, 
		ProductAttributesModule, 
		ProductsModule, 
		ProfileModule,
		RolesModule,
		TaxModule, 
		UserModule,
		PermissionModule, 
		FaqsModule, 
		FaqCateModule,
		TagsModule,
		CategoriesModule, 
		PostsModule
	],
})
export class ApiModule {}
