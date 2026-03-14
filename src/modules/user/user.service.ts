import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto'
import { Injectable, Logger ,NotFoundException,BadRequestException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ErrorCode } from '@/constants/error-code.constant';
import { plainToInstance } from 'class-transformer';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { paginate } from '@/utils/offset-pagination';
import assert from 'assert';
import { UserAlreadyExistsException } from './user.error';
import { compareSync } from 'bcrypt';
import { hashPassword } from '@/utils/password.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);

	constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){};
	
	async create(dto: CreateUserDto) :Promise<UserResDto> {
		const { username, email, password, first_name, last_name } = dto;

		const user = await this.userRepository.findOne({
			where: [
				{ username, },
				{ email, },
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

  	async update(id: number, dto: UpdateUserDto) {
		const user = await this.userRepository.findOneByOrFail({ id });
		if (dto.password) {
			user.password  = await hashPassword(dto.password);
		}
		if (dto.first_name !== undefined) {
			user.first_name = dto.first_name;
		}

		if (dto.last_name !== undefined) {
			user.last_name = dto.last_name;
		}

		if (dto.avatar !== undefined) {
			user.avatar = dto.avatar;
		}

		if (dto.phone !== undefined) {
			user.phone = dto.phone;
		}
		await this.userRepository.save(user);

		return user;
  	}

	async updatePassword( userId: number, newPassword: string) {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			select: ['id', 'password'],
		});
	
		if (!user) {
			throw new NotFoundException('Customer not found');
		}

		const hashedPassword = await hashPassword(newPassword);
	
		await this.userRepository.update(userId, {
			password: hashedPassword,
		});
	
		return { message: 'Password updated successfully' };
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
