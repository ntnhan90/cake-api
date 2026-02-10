import { Controller, Get, Post, Body, Put, Param, Delete, Query , Req} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResDto } from './dto/post.res.dto';
import { ListPostsReqDto } from './dto/list-posts.req.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    create(@Body() dto: CreatePostDto) :Promise<PostResDto> {
        return this.postsService.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() reqDto: ListPostsReqDto) :Promise<OffsetPaginatedDto<PostResDto>> {
        return this.postsService.findAll(reqDto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: number):Promise<PostResDto>  {
        return this.postsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
        return this.postsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.postsService.remove(+id);
    }
}
