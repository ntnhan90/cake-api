import {
  StringField,
} from '@/decorators/field.decorators';

export class CreatePermissionDto {
    @StringField()
    name:string

    @StringField()
    description:string

    @StringField()
    module:string

    @StringField()
    path:string

    @StringField()
    method:string
}
