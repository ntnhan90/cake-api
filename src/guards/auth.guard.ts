import { AuthService } from "src/modules/auth/auth.service";
import { AdminService } from "src/modules/admin/admin.service";
import { IS_AUTH_OPTIONAL, IS_PUBLIC } from "@/constants/app.constant";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private authService: AdminService
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC,[
            context.getHandler(),
            context.getClass(),
        ]);
        if(isPublic) return true;

        const isAuthOptional = this.reflector.getAllAndOverride<boolean>(
            IS_AUTH_OPTIONAL,
            [context.getHandler(), context.getClass()],
        );

        const request = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(request);

        if(isAuthOptional && !accessToken){
            return true;
        }
        if(!accessToken){
            throw new UnauthorizedException();
        }
        request['user'] = await this.authService.verifyAccessToken(accessToken);
        console.log("guard")
        return true;
    }

    private extractTokenFromHeader(request: Request): string| undefined{
        const [type,token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
}