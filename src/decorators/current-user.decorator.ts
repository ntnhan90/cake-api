import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '@/constants/app.constant';
import { AccessTokenPayload } from 'src/types/jwt.type';

export const ActiveUser = createParamDecorator(
    (field: keyof AccessTokenPayload | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        const user: AccessTokenPayload | undefined = request[REQUEST_USER_KEY]
        return field ? user?.[field] : user
    },
)

export const CurrentUser = createParamDecorator(
    (data:string, ctx: ExecutionContext) =>{
        const request = ctx.switchToHttp().getRequest<Request>();
        const user = request['user'];

        return data ? user?.[data] : user;
    }
)

