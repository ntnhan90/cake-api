import { IsString, Length } from "class-validator";
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'


export const LoginBodySchema = z.object({
    email: z.string(),
    password: z.string(),
})
export class LoginBodyDTO extends createZodDto(LoginBodySchema) {  }
export type LoginBodyType = z.infer<typeof LoginBodySchema>

export const LoginResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})
export class LoginResDTO extends createZodDto(LoginResSchema) {  }

