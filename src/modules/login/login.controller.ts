import { Controller, Get, Post, Body, Patch, Param, Delete ,Query} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiAuth, ApiPublic } from '@/decorators/http.decorators';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @ApiPublic({
        type: LoginResDto,
        summary: 'Sign in',
    })
    @Post()
        create(@Body() createUserDto: CreateUserDto) {
            return "create user login";
            //return this.userService.create(createUserDto);
        }

    @ApiAuth({
        summary: 'Logout',
        errorResponses: [400, 401, 403, 500],
    })
    @Post('logout')
    signIn(@Body() userLogin: LoginReqDto) {
        return " login";
    }

}
