import { CursorPaginatedDto } from '@/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete ,Query,HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { ApiAuth } from '@/decorators/http.decorators';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorators/public.decorators';
import { AuthOptional } from '@/decorators/auth-optional.decorators';

@Controller('user')
export class UserController {
  	constructor(private readonly userService: UserService) {}

	/*
  	@Post()
	@ApiAuth({
		type: UserResDto,
		summary: 'Create user',
		statusCode: HttpStatus.CREATED,
	})
  	async create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
  	}
	*/
	@Post()
	@ApiAuth({
		type: UserResDto,
		summary: 'Create user',
		statusCode: HttpStatus.CREATED,
	})
	async create(@Body() createUserDto: CreateUserDto): Promise<UserResDto>{
		return await this.userService.create(createUserDto);
	}


  	@Get()
//	@AuthOptional()
  	@ApiAuth({
		type: UserResDto,
		summary: 'List users',
	//	isPaginated: true,
		auths: ['jwt'],
 	 })
  	findAll(@Query() reqDto: ListUserReqDto): Promise<OffsetPaginatedDto<UserResDto>> {
    	return this.userService.findAll(reqDto);
  	}

  	@Get(':id')
	@ApiAuth({ type: UserResDto, summary: 'Find user by id' })
  	@ApiParam({ name: 'id', type: 'String' })
  	findOne(@Param('id') id: number) {
    	return this.userService.findOne(+id);
  	}

  	@Patch(':id')
	@ApiAuth({ type: UserResDto, summary: 'Update user' })
  	@ApiParam({ name: 'id', type: 'String' })
  	update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    	return this.userService.update(id, updateUserDto);
  	}

  	@Delete(':id')
	@ApiAuth({
		summary: 'Delete user',
		errorResponses: [400, 401, 403, 404, 500],
	})
	@ApiParam({ name: 'id', type: 'String' })
  	remove(@Param('id') id: number) {
    	return this.userService.remove(+id);
  	}
}
