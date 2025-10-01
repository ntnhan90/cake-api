import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  	imports:[
		UserModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.register({}),
  	],
  	controllers: [AuthController],
  	providers: [AuthService],
})
export class AuthModule {}
