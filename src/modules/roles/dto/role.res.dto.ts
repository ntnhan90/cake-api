import {StringField,NumberField} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

export class PermissionResDto {
  id: number;
  name: string;
  path: string;
  method: string;
  module: string;
}

@Exclude()
export class RoleResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
	@Expose()
	name: string;

	permissions: PermissionResDto[];

  @StringField()
	@Expose()
	description: string;

  @NumberField()
	@Expose()
	is_default: number;

}
