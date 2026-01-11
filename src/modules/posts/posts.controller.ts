import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

    @Get()
    findAll(@Query() reqDto: ListPostsReqDto) :Promise<OffsetPaginatedDto<PostResDto>> {
        return this.postsService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<PostResDto>  {
        return this.postsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
        return this.postsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
