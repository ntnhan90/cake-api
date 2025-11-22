import { Injectable,UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { UserRepository } from '../user/repo/user.repo';
import { 
    EmailNotFoundException,
    InvalidPasswordException
} from './auth.error';
import { AccountResDto } from './dto/account.dto';
import { 
    AccessTokenPayload,
    AccessTokenPayloadCreate,
    RefreshTokenPayload,
    RefreshTokenPayloadCreate,
} from 'src/types/jwt.type';
import { compare } from 'bcrypt'
import { Branded } from '@/common/types/types';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RefreshResDto } from './dto/refresh.res.dto';
import { plainToInstance } from 'class-transformer';

type Token = Branded<
  {
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  },
  'token'
>;

@Injectable()
export class AdminService {
    constructor(
        private readonly configService: ConfigService<AllConfigType>,
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
    ) {}

    async login(body: LoginReqDto): Promise<LoginResDto>{
        // 1. Lấy thông tin user, kiểm tra user có tồn tại hay không, mật khẩu có đúng không
        const user = await this.userRepository.findOneBy(
            { email: body.email, },
        );

        if (!user) {
            throw EmailNotFoundException
        }
        
        const isPasswordMatch = await compare(body.password, user.password);
        if(!isPasswordMatch){
            console.log("ko trung password")
            throw InvalidPasswordException
        }
        // 3. Tạo mới device
        
        // 4. Tạo mới accessToken và refreshToken
        const payload :AccessTokenPayloadCreate= {
            userId: user.id,
            deviceId: 1,
            roleId: 1,
            roleName: "Admin",
        }
        
        const accessToken = this.signAccessToken(payload)
        const refreshToken = this.signRefreshToken(payload);
        const account = plainToInstance(AccountResDto, user);

        const data= {
            account,
            accessToken,
            refreshToken
        }

        
        return data
    }

    async generateTokens({ userId, deviceId, roleId, roleName }: AccessTokenPayloadCreate){
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken({
                userId,
                deviceId,
                roleId,
                roleName,
            }),
            this.signRefreshToken({
                userId,
            }),
        ])

        const decodedRefreshToken = await this.verifyRefreshToken(refreshToken);
        const user = this.userRepository.updateRefreshTokenInUser(refreshToken, userId)	

        return { userId,accessToken, refreshToken }
    }

    async refreshToken(dto: RefreshReqDto): Promise<RefreshResDto> {
        console.log(dto);
        const tokens = await this.generateTokens({
            userId: 1,
            deviceId: 1,
            roleId: 1,
            roleName: "Admin",
        })

        return tokens
    }

    async logout(refreshToken: string){
        console.log(refreshToken);
        try {
            // 1. Kiểm tra refreshToken có hợp lệ không
            const user = await this.verifyRefreshToken(refreshToken)
            // 2. Xóa refreshToken trong database
           // const user = await this.userRepository.findOneByOrFail({id: userId });
		    //user.refresh_token = "";
            // 3. Cập nhật device là đã logout
            
            return { message: 'Đăng xuất thành công' }
        } catch (error) {
           return { message: 'Đăng xuất thành12 công' }
        }
    }

    private signAccessToken(payload:AccessTokenPayloadCreate){
        return this.jwtService.sign(
            {...payload},
            {
                secret: this.configService.getOrThrow('auth.secret', { infer: true }),
                expiresIn: this.configService.getOrThrow('auth.expires', { infer: true }),
                algorithm: 'HS256',
            }
        )
    }
    
    private signRefreshToken(payload: RefreshTokenPayloadCreate) {
        return this.jwtService.sign(
            {...payload},
            {
                secret: this.configService.getOrThrow('auth.refreshSecret', { infer: true }),
                expiresIn: this.configService.getOrThrow('auth.refreshExpires', { infer: true }),
                algorithm: 'HS256',
             }
        )
    }
      
    public verifyAccessToken(token: string): Promise<AccessTokenPayload> {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        })
    }
      
    private verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.getOrThrow('auth.refreshSecret', { infer: true }),
        })
    }
}
