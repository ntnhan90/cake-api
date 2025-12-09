import z from "zod";
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';
import { Exclude, Expose } from 'class-transformer';
import {
  EmailField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';

@Exclude()
export class ProfileResDto {
    @Expose()
    id: number

    @StringField()
    @Expose()
    username: string;

    @EmailField()
    @Expose()
    email: string;

    @StringFieldOptional()
    @Expose()
    avatar_id?: string;
}

