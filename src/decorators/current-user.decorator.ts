import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
    (data:string, ctx: ExecutionContext) =>{
        const request = ctx.switchToHttp().getRequest<Request>();
        const user = request['user'];

        return data ? user?.[data] : user;
    }
)