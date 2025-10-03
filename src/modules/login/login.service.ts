import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Branded } from '@/common/types/types';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { SessionEntity } from '../user/entities/session.entity';
import { Repository } from 'typeorm';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { verifyPassword } from '@/utils/password.util';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import ms from 'ms';
import crypto from 'crypto';
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
export class LoginService {
	constructor(
		private readonly configService: ConfigService<AllConfigType>,
		private readonly jwtService: JwtService,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async signIn(dto:LoginReqDto): Promise<LoginResDto>{
		const { email, password } = dto;
		const user = await this.userRepository.findOne({
			where: {email},
			select: ['id', 'email', 'password'],
		});

		const isPasswordValid = user && (await verifyPassword(password, user.password));

		if(!isPasswordValid){
			console.log(' sai pass');
			throw new UnauthorizedException();
		}

		const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');
		
		const session = new SessionEntity({
			hash,
			userId: user.id,
		});

		await session.save();

		const token = await this.createToken({
			id: user.id,
			sessionId: session.id,
			hash,
    	});

		return plainToInstance(LoginResDto, {
			userId: user.id,
			...token,
    	});
	}


	private async createToken(data: {
		id:number;
		sessionId: string;
		hash:string;
	}) : Promise<Token>{
		const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      		infer: true,
    	});
    	const tokenExpires = Date.now() + ms(tokenExpiresIn);

		const [accessToken, refreshToken] = await Promise.all([
			await this.jwtService.signAsync(
				{
					id:data.id,
					role: '',
					sessionId: data.sessionId,
				},{
					secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          			expiresIn: tokenExpiresIn,
				}
			),
			await this.jwtService.signAsync(
				{
					sessionId: data.sessionId,
					hash: data.hash,
				},
				{
					secret: this.configService.getOrThrow('auth.refreshSecret', {
						infer: true,
					}),
					expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
						infer: true,
					}),
				}
			),
		])
 
		return {
			accessToken,
			refreshToken,
			tokenExpires,
		} as Token;
	}
}
