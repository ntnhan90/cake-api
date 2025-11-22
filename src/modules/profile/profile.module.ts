import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
      UserModule,
      TypeOrmModule.forFeature([UserEntity]),
    ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
