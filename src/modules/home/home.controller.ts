import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('home')
export class HomeController {


  @Get()
  home() {
    return 'Welcome to the API';
  }
}
