import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ListTagsReqDto } from './dto/list-tags.req.dto';
import { TagsResDto } from './dto/tags.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    async create(@Body() dto: CreateTagDto) :Promise<TagsResDto>{
        return await this.tagsService.create(dto);
    }

    @Public()
    @Get()
    async findAll(@Query() reqDto: ListTagsReqDto):Promise<OffsetPaginatedDto<TagsResDto>> {
        return await this.tagsService.findAll(reqDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) :Promise<TagsResDto>{
        return await this.tagsService.findOne(+id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
         return await this.tagsService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.tagsService.remove(+id);
    }
}
