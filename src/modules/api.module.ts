import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ContactModule } from './contact/contact.module';
import { PaymentModule } from './payment/payment.module';
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

@Module({
  	imports: [
   	 	HealthModule, 
		HomeModule, 
		UserModule,
		RolesModule,  
		AuthModule, 
		PostModule, 
		ContactModule, 
		PaymentModule, 
		CustomersModule, 
		ProductsModule, 
		AdminModule, 
		ProductCategoriesModule, 
		ProductTagsModule, 
		ProductCollectionsModule, 
		ProductLabelsModule, 
		ProductAttributesModule, 
		CurrenciesModule, ProfileModule,
	],
})
export class ApiModule {}
