import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
//secretApiKey

@Injectable()
export class APIKeyGuard implements CanActivate {
    private readonly configService: ConfigService<AllConfigType>

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const xAPIKey = request.headers['x-api-key']
        if (xAPIKey !== this.configService.getOrThrow('auth.secretApiKey', { infer: true }) ) {
            throw new UnauthorizedException()
        }
        return true
    }
}
