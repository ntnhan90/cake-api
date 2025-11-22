import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiPublic, ApiAuth } from '@/decorators/http.decorators';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Public } from '@/decorators/public.decorators';
import { ActiveUser } from '@/decorators/current-user.decorator';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @ApiPublic({
        summary: 'Sign in',
    })
    @Get()
    getProfile(@ActiveUser('userId') userId: number) {
        console.log(userId)
        return this.profileService.getProfile(userId);
    }
}
