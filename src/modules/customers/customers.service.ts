import { Injectable ,BadRequestException,NotFoundException} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateCustomerPasswordDto } from './dto/update-customer-password.dto';
import { ListCustomerReqDto } from './dto/list-customer.req.dto';
import { CustomerResDto } from './dto/customer.res.dto';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerAddressEntity } from './entities/customer_address.entity';
import { In,Repository } from 'typeorm';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { compareSync } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { hashPassword as hashPass } from '@/utils/password.util';

@Injectable()
export class CustomersService {
    constructor(  
        @InjectRepository(CustomerEntity)
        private readonly customerRepo: Repository<CustomerEntity>,

        @InjectRepository(CustomerAddressEntity)
        private readonly addressRepo: Repository<CustomerAddressEntity>,
    ){}

    async create(dto: CreateCustomerDto):Promise<CustomerResDto> {
        const newCustomer = this.customerRepo.create(dto);
        return await this.customerRepo.save(newCustomer)
    }

    async findAll(reqDto: ListCustomerReqDto) :Promise<OffsetPaginatedDto<CustomerResDto>> {
        const query = this.customerRepo.createQueryBuilder('customers').orderBy(
            'customers.createdAt',
            'DESC'
        )

        const [discounts,metaDto] = await paginate<CustomerResDto>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(CustomerResDto, discounts), metaDto);
    }

    async findOne(id: number)  :Promise<CustomerResDto>{
        assert(id, 'id is required');
        const customer = await this.customerRepo.findOneByOrFail({id});
        return customer.toDto(CustomerResDto);
    }

    async update(id: number, dto: UpdateCustomerDto) {
        const customer = await this.customerRepo.findOneByOrFail({id});
        if (!customer) throw new NotFoundException();

        if (dto.password) {
            //customer.password = await hash(dto.password);
            customer.password = dto.password
        }
        if ('dob' in dto) {
            customer.dob = dto.dob; // Date | null
        }
        customer.name = dto.name;
        customer.phone = dto.phone


        return this.customerRepo.save(customer);
    }

    async updatePassword( customerId: number, dto: UpdateCustomerPasswordDto,) {
        const customer = await this.customerRepo.findOne({
            where: { id: customerId },
            select: ['id', 'password'],
        });

        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        const isMatch = await bcrypt.compare(
            dto.oldPassword,
            customer.password,
        );

        if (!isMatch) {
            throw new BadRequestException('Old password is incorrect');
        }
      //  this.password = await hashPass(this.password)
      //  const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        const hashedPassword = await hashPass(dto.newPassword);

        await this.customerRepo.update(customerId, {
            password: hashedPassword,
        });

        return { message: 'Password updated successfully' };
    }

    async remove(id: number) {
        await this.customerRepo.findOneByOrFail({id});
		await this.customerRepo.softDelete(id);
    }

    isValidPassword(password:string, hash:string){
            return compareSync(password, hash)
        }
}
