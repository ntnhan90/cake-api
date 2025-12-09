import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repo/user.repo';
import { NotFoundException } from "@nestjs/common";
import { ProfileResDto } from './dto/profile.res.dto';

@Injectable()
export class ProfileService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async getProfile(id: number) : Promise<ProfileResDto> {
        const user = await this.userRepository.findUniqueIncludeRolePermissions(id);
        if (!user) {
            throw NotFoundException
        }
        return user.toDto(ProfileResDto);
    }
}
