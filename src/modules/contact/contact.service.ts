import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactResDto } from './dto/contact.res.dto';
import { ListContactReqDto } from './dto/list-contact.req.dto';
import { ContactRepository } from './repo/contact.repo';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ContactEntity } from './entities/contact.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToClass } from 'class-transformer';
import assert from 'assert';

@Injectable()
export class ContactService {
    constructor(private readonly contactRepo : ContactRepository) {}
    async create(dto: CreateContactDto):Promise<ContactResDto> {
        const newContact = this.contactRepo.create(dto);
        return await this.contactRepo.save(newContact);
    }

    async findAll(reqDto:ListContactReqDto) : Promise<OffsetPaginatedDto<ContactResDto>> {
        const query = this.contactRepo.createQueryBuilder('contacts').orderBy(
            'contacts.createdAt',
            'DESC'
        )

        const [currencies,metaDto] = await paginate<ContactEntity>(query, reqDto,{
            skipCount:false,
            takeAll: false
        });

        return new OffsetPaginatedDto(plainToClass(ContactResDto, currencies),metaDto)
    }

    async findOne(id: number) :Promise<ContactResDto>{
        assert(id, 'id is required');
        const contact = await this.contactRepo.findOneByOrFail({id});
        return contact.toDto(ContactResDto)
    }

    async update(id: number, dto: UpdateContactDto) {
        const contact = await this.contactRepo.findOneByOrFail({id})
        contact.status = dto.status;
        return this.contactRepo.save(contact);
    }

    async remove(id: number) {
        await this.contactRepo.findOneByOrFail({id});
		await this.contactRepo.softDelete(id);
    }
}
