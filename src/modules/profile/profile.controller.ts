import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiPublic, ApiAuth } from '@/decorators/http.decorators';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Public } from '@/decorators/public.decorators';
import { ActiveUser } from '@/decorators/current-user.decorator';
import { ProfileResDto } from './dto/profile.res.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @ApiPublic({
        summary: 'Sign in',
    })
    @Get()
    async getProfile(@ActiveUser('userId') userId: number): Promise<ProfileResDto>  {
        return await this.profileService.getProfile(userId);
    }
}
