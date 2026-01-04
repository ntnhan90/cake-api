import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Public } from '@/decorators/public.decorators';
import { ContactResDto } from './dto/contact.res.dto';
import { ListContactReqDto } from './dto/list-contact.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Post()
	@Public()
	create(@Body() dto: CreateContactDto) :Promise<ContactResDto>{
		return this.contactService.create(dto);
	}

	@Get()
	@Public()
	findAll(@Query() reqDto:ListContactReqDto) : Promise<OffsetPaginatedDto<ContactResDto>> {
		return this.contactService.findAll(reqDto);
	}

	@Get(':id')
	findOne(@Param('id') id: number) :Promise<ContactResDto>{
		return this.contactService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() dto: UpdateContactDto) {
		return this.contactService.update(+id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.contactService.remove(+id);
	}
}
