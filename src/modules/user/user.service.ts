//import { CursorPaginationDto } from '@/common/dto/cursor-pagination/cursor-pagination.dto';
//import { CursorPaginatedDto } from '@/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto'
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { plainToInstance } from 'class-transformer';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { paginate } from '@/utils/offset-pagination';
import assert from 'assert';
import { UserRepository } from './repo/user.repository';
import { UserAlreadyExistsException } from './user.error';
import { compareSync } from 'bcrypt';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);

	constructor(private readonly userRepository: UserRepository) {}
	
	async create(dto: CreateUserDto) :Promise<UserResDto> {
		const { username, email, password, first_name, last_name } = dto;

		// check uniqueness of username/email
		const user = await this.userRepository.findOne({
			where: [
				{
					username,
				},
				{
					email,
				},
			],
		});

		if (user) {
			console.log(ErrorCode.E001)
			throw UserAlreadyExistsException
			//throw new ValidationException(ErrorCode.E001);
		}

		const newUser = new UserEntity({
			username,
			email,
			password,
			first_name,
			last_name
		});

		const savedUser = await this.userRepository.save(newUser);
    	this.logger.debug(savedUser);
		return plainToInstance(UserResDto, savedUser);
  	}

 	async findAll(reqDto: ListUserReqDto,): Promise<OffsetPaginatedDto<UserResDto>> {
		const query = this.userRepository.createQueryBuilder('user').orderBy('user.createdAt', 'DESC');
    	const [users, metaDto] = await paginate<UserEntity>(query, reqDto, {
			skipCount: false,
			takeAll: false,
		});
    	return new OffsetPaginatedDto(plainToInstance(UserResDto, users), metaDto);
 	}

 	async findOne(id: number) : Promise<UserResDto>{
		assert(id, 'id is required');
    	const user = await this.userRepository.findOneByOrFail({ id });

    	return user.toDto(UserResDto);
 	}

  	async update(id: number, updateUserDto: UpdateUserDto) {
  		console.log(updateUserDto);
		const user = await this.userRepository.findOneByOrFail({ id });
		user.password = updateUserDto.password;
		user.first_name = updateUserDto.first_name;
		user.last_name = updateUserDto.last_name;
		user.refresh_token = updateUserDto.refresh_token;
    	await this.userRepository.save(user);;
  	}

  	async remove(id: number) {
		await this.userRepository.findOneByOrFail({id});
		await this.userRepository.softDelete(id);
  	}

	findOneByEmail(email: string) {
		return  this.userRepository.findOneBy({ email:email });
	}

	isValidPassword(password:string, hash:string){
		return compareSync(password, hash)
	}
}
