import { Controller, Get, Post, Body, Put, Param, Delete ,Query} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractResDto } from './dto/contract.res.dto';
import { ListContractReqDto } from './dto/list-contract.req.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('contract')
export class ContractController {
    constructor(private readonly contractService: ContractService) {}

    @Post()
    create(@Body() dto: CreateContractDto):Promise<ContractResDto>  {
        return this.contractService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto:ListContractReqDto) : Promise<OffsetPaginatedDto<ContractResDto>> {
        return this.contractService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<ContractResDto>  {
        return this.contractService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateContractDto) {
        return this.contractService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.contractService.remove(+id);
    }
}
