import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
