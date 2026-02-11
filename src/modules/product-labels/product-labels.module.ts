import { Module } from '@nestjs/common';
import { ProductLabelsService } from './product-labels.service';
import { ProductLabelsController } from './product-labels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLabelsEntity } from './entities/product-label.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductLabelsEntity])],
    controllers: [ProductLabelsController],
    providers: [ProductLabelsService],
})
export class ProductLabelsModule {}
