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

@Module({
  	imports: [
   	 	HealthModule, 
		HomeModule, 
		UserModule, 
		AuthModule, 
		PostModule, 
		ContactModule, 
		PaymentModule, 
		CustomersModule, 
		ProductsModule, 
		AdminModule, RolesModule,
	],
})
export class ApiModule {}
