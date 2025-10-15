import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { REQUEST_USER_KEY } from "@/constants/app.constant";
import { AccessTokenPayload } from "src/types/jwt.type";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "@/config/config.type";
@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService<AllConfigType>,
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(  context: ExecutionContext ): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization?.split(' ')[1]

        if(!accessToken){
            throw new UnauthorizedException()
        }

        try{
            const decodedAccessToken = await this.verifyAccessToken(accessToken)
            request[REQUEST_USER_KEY] = decodedAccessToken
            return true
        }catch{
            throw new UnauthorizedException()
        }
    }

    private verifyAccessToken(token: string): Promise<AccessTokenPayload> {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        })
    }
}