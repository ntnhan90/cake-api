import { Injectable ,BadRequestException,NotFoundException} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateCustomerPasswordDto } from './dto/update-customer-password.dto';
import { ListCustomerReqDto } from './dto/list-customer.req.dto';
import { CustomerResDto } from './dto/customer.res.dto';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerAddressEntity } from './entities/customer_address.entity';
import { Repository } from 'typeorm';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { compareSync } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { hashPassword as hashPass } from '@/utils/password.util';
import { Order } from '@/constants/app.constant';

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
        const order = reqDto.order ?? Order.DESC;
        const query = this.customerRepo
            .createQueryBuilder('customers')
            .orderBy('customers.createdAt', order)

        if (reqDto.q?.trim()) {
            query.andWhere(
          //  '(customers.name LIKE :q OR posts.slug LIKE :q)',
           '(customers.name LIKE :q)',
            { q: `%${reqDto.q.trim()}%` }
            );
        }
        const [customers,metaDto] = await paginate<CustomerEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToInstance(CustomerResDto, customers), metaDto);
    }

    async findOne(id: number)  :Promise<CustomerResDto>{
        assert(id, 'id is required');
        const customer = await this.customerRepo.findOne({
            where: { id },
            relations: ['addresses'],
        });
        
        return plainToInstance(CustomerResDto, customer, {
            excludeExtraneousValues: false,
        });
    }

    async update(id: number, dto: UpdateCustomerDto) {
        const customer = await this.customerRepo.findOne({
            where: { id },
            relations: ['addresses'],
        });

        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        /* ================= CUSTOMER ================= */
        if (dto.password) customer.password = dto.password;

        if ('dob' in dto) {
            customer.dob = dto.dob ?? null;
        }

        if (dto.name !== undefined) customer.name = dto.name;
        if (dto.phone !== undefined) customer.phone = dto.phone;
        if (dto.status !== undefined) customer.status = dto.status;

        /* ================= ADDRESSES ================= */
        /* ================= ADDRESSES ================= */
        if (dto.addresses) {
            const existingMap = new Map<number, CustomerAddressEntity>();

            for (const a of customer.addresses ?? []) {
                if (a?.id) existingMap.set(a.id, a);
            }

            const addressesToSave: CustomerAddressEntity[] = [];

            for (const addrDto of dto.addresses) {
                let address: CustomerAddressEntity;

                if (addrDto.id) {
                    address = existingMap.get(addrDto.id);
                    if (!address) {
                        throw new NotFoundException(
                            `Address id ${addrDto.id} not found`,
                        );
                    }
                } else {
                    address = this.addressRepo.create();
                    address.customer = customer; // ✅ CHỈ DÒNG NÀY LÀ ĐỦ
                }

                address.name = addrDto.name;
                address.phone = addrDto.phone;
                address.country = addrDto.country ?? null;
                address.state = addrDto.state ?? null;
                address.city = addrDto.city ?? null;
                address.address = addrDto.address;
                address.zip_code = addrDto.zip_code ?? null;
                address.is_default = addrDto.is_default ? 1 : 0;

                addressesToSave.push(address);
            }

            // reset default
            const defaultAddr = addressesToSave.find(a => a.is_default === 1);
            if (defaultAddr) {
                addressesToSave.forEach(a => {
                    if (a !== defaultAddr) a.is_default = 0;
                });
            }

            await this.addressRepo.save(addressesToSave);
        }

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
