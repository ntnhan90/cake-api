import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';
import { CustomerEntity } from '../customers/entities/customer.entity';

@Module({
  	imports:[
		CustomersModule,
		TypeOrmModule.forFeature([CustomerEntity]),
		JwtModule.register({}),
  	],
  	controllers: [AuthController],
  	providers: [AuthService],
})
export class AuthModule {}
