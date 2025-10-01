//import { CursorPaginatedDto } from '@/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete ,Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { ApiAuth } from '@/decorators/http.decorators';

@Controller('user')
export class UserController {
  	constructor(private readonly userService: UserService) {}

  	@Post()
  	create(@Body() createUserDto: CreateUserDto) {
    	return this.userService.create(createUserDto);
  	}

  	@Get()
  	@ApiAuth({
		type: UserResDto,
		summary: 'List users',
		isPaginated: true,
 	 })
  	findAll(@Query() reqDto: ListUserReqDto,): Promise<OffsetPaginatedDto<UserResDto>> {
    	return this.userService.findAll(reqDto);
  	}

  	@Get(':id')
  	findOne(@Param('id') id: string) {
    	return this.userService.findOne(+id);
  	}

  	@Patch(':id')
  	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    	return this.userService.update(+id, updateUserDto);
  	}

  	@Delete(':id')
  	remove(@Param('id') id: string) {
    	return this.userService.remove(+id);
  	}
}
