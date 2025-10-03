import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports:[
      UserModule,
      TypeOrmModule.forFeature([UserEntity]),
      JwtModule.register({}),
      ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
