//import { CursorPaginationDto } from '@/common/dto/cursor-pagination/cursor-pagination.dto';
//import { CursorPaginatedDto } from '@/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto'
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { paginate } from '@/utils/offset-pagination';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);
	
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository:Repository<UserEntity>,
	){}

	async create(dto: CreateUserDto) :Promise<UserResDto> {
		const { username, email, password } = dto;

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
			throw new ValidationException(ErrorCode.E001);
		}

		const newUser = new UserEntity({
			username,
			email,
			password,
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.findOneByOrFail({ id });
		user.password = updateUserDto.password;

    	await this.userRepository.save(user);;
  	}

  	async remove(id: number) {
		await this.userRepository.findOneByOrFail({id});
		await this.userRepository.softDelete(id);
  	}
}
