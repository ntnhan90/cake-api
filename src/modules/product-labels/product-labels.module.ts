import { Module } from '@nestjs/common';
import { ProductLabelsService } from './product-labels.service';
import { ProductLabelsController } from './product-labels.controller';

@Module({
  controllers: [ProductLabelsController],
  providers: [ProductLabelsService],
})
export class ProductLabelsModule {}
