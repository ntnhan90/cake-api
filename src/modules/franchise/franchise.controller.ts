import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { FranchiseService } from './franchise.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import { FranchiseResDto } from './dto/franchise.res.dto';
import { ListFranchiseReqDto } from './dto/list-franchise.req.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('franchise')
export class FranchiseController {
    constructor(private readonly franchiseService: FranchiseService) {}

    @Post()
    create(@Body() dto: CreateFranchiseDto) :Promise<FranchiseResDto>{
        return this.franchiseService.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() reqDto: ListFranchiseReqDto)  :Promise<OffsetPaginatedDto<FranchiseResDto>> {
        return this.franchiseService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) :Promise<FranchiseResDto>{
        return this.franchiseService.findOne(+id);
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateFranchiseDto) {
        return this.franchiseService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.franchiseService.remove(+id);
    }
}
