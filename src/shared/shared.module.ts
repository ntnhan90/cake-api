import { Global, Module } from '@nestjs/common';
import { ObjectLiteral, ObjectType } from 'typeorm';

@Global()
@Module({
  imports: [],
})
export class SharedModule {}

