import { Injectable } from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserRepository } from '../user/repo/user.repo';
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class ProfileService {
    constructor(
        private readonly userRepository: UserRepository
    ){}
    getProfile(id: number) {

        const user = this.userRepository.findUniqueIncludeRolePermissions(id);
        if (!user) {
            throw NotFoundException
        }

        return user
    }
}
