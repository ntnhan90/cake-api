import { Injectable } from '@nestjs/common';
import { NotFoundException } from "@nestjs/common";
import { ProfileResDto } from './dto/profile.res.dto';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){};

    async getProfile(id: number) : Promise<ProfileResDto> {
        const user = await this.userRepository.findOneByOrFail({ id });
        if (!user) {
            throw NotFoundException
        }
        return user.toDto(ProfileResDto);
    }
}
