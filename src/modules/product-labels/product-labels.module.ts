import { Module } from '@nestjs/common';
import { ProductLabelsService } from './product-labels.service';
import { ProductLabelsController } from './product-labels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLabelsEntity } from './entities/product-label.entity';
import { ProductLabelsRepository } from './repo/product-labels.repo';

@Module({
    imports: [TypeOrmModule.forFeature([ProductLabelsEntity])],
    controllers: [ProductLabelsController],
    providers: [ProductLabelsService,ProductLabelsRepository],
})
export class ProductLabelsModule {}
