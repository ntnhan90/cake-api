import { Injectable,UnauthorizedException, UnprocessableEntityException,HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { hashPassword } from '@/utils/password.util';
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
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { MailService } from '@/mail/mail.service';
import { BadRequestException } from '@nestjs/common';

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
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly mailService: MailService, 
    ) {}

    async login(body: LoginReqDto): Promise<LoginResDto>{
        const user = await this.userRepository.findOne({
            where: { email: body.email },
          //  select: ['id', 'email', 'password', 'status'],
            select: ['id', 'email', 'password'],
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const isPasswordMatch = await compare(body.password, user.password);
        /*
        if(!isPasswordMatch){
            throw new UnauthorizedException('Password incorrect');
        }*/
        const payload :AccessTokenPayloadCreate= {
            userId: user.id,
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

    async generateTokens({ userId, roleId, roleName }: AccessTokenPayloadCreate){
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken({
                userId,
                roleId,
                roleName,
            }),
            this.signRefreshToken({
                userId,
            }),
        ])

        await this.verifyRefreshToken(refreshToken);

        return { userId,accessToken, refreshToken }
    }

    async refreshToken(dto: RefreshReqDto): Promise<RefreshResDto> {
        try {
            // 1. Kiểm tra refreshToken có hợp lệ không
            const { userId } = await this.verifyRefreshToken(dto.refreshToken)
            // 2. Kiểm tra refreshToken có tồn tại trong database không
           
            // 4. Xóa refreshToken cũ
       
            // 5. Tạo mới accessToken và refreshToken
            const user = await this.userRepository.findOneBy(
                { id: userId, },
            );

            const payload :AccessTokenPayloadCreate= {
                userId: userId,
                roleId: 1,
                roleName: "Admin",
            }
            const accessToken = this.signAccessToken(payload)
            const refreshToken = this.signRefreshToken(payload);
            const account = plainToInstance(AccountResDto, user);

            const data= {
                user,
                accessToken,
                refreshToken
            }

            return data

        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            }
            throw new UnauthorizedException('Error.UnauthorizedAccess')
        }  

       
    }

    async logout(refreshToken: string){
        try {
            // 1. Kiểm tra refreshToken có hợp lệ không
            const user = await this.verifyRefreshToken(refreshToken)
            // 2. Xóa refreshToken trong database
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


    async forgotPassword(email: string) {

        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            return { message: "If email exists, reset link sent" };
        }

        const token = randomBytes(32).toString("hex");

    //    user.resetPasswordToken = token;
    //    user.resetPasswordExpire = new Date(Date.now() + 3600000); // 1h

        await this.userRepository.save(user);

        await this.mailService.sendResetPasswordEmail(
            user.email,
            token
        );

        return { message: "Reset email sent" };
    }

    async resetPassword(id: number, password: string) {
        const user = await this.userRepository.findOneByOrFail({ id });

        if (!user) {
            throw new BadRequestException("Invalid token");
        }
        user.password = await hashPassword(password);

      //  user.resetPasswordToken = null;
      //  user.resetPasswordExpire = null;

        await this.userRepository.save(user);

        return { message: "Password updated" };
    }
}
