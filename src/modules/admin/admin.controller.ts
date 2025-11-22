import { Controller, Post, HttpCode, HttpStatus, Body} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiPublic, ApiAuth } from '@/decorators/http.decorators';
import { LoginResDto } from './dto/login.res.dto';
import { LoginReqDto } from './dto/login.req.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RefreshResDto } from './dto/refresh.res.dto';
import { Public } from '@/decorators/public.decorators';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @ApiPublic({
        type: LoginResDto,
        summary: 'Sign in',
    })
    @Post('login')
    async signIn(@Body() userLogin: LoginReqDto): Promise<LoginResDto> {
        return await this.adminService.login(userLogin);
    }

    @ApiPublic({
        type: RefreshResDto,
        summary: 'Refresh token',
    })
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() dto: RefreshReqDto): Promise<RefreshResDto>  {
        return await this.adminService.refreshToken(dto);
    }

    @ApiAuth({
        summary: 'Logout',
        errorResponses: [400, 401, 403, 500],
    })
    @Post('logout')
    async logout() {
        return "logout"
    }
}
