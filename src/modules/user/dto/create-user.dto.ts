import { 
    StringField,
    PasswordField,
    EmailField,
    StringFieldOptional
} from "@/decorators/field.decorators";
import { lowerCaseTransformer } from "@/utils/transformers/lower-case.transformer";
import { Transform } from "class-transformer";

export class CreateUserDto {
    @StringField()
    @Transform(lowerCaseTransformer)
    username:string;

    @EmailField()
    email: string;

    @PasswordField()
    password: string;

    @StringFieldOptional()
    first_name?: string;

    @StringFieldOptional()
    last_name?: string;

    @StringFieldOptional()
    avatar_id?: string;
}
