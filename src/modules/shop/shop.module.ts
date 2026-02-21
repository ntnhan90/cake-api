import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { FranchiseEntity } from '../franchise/entities/franchise.entity';
@Module({
    imports: [TypeOrmModule.forFeature([ShopEntity,FranchiseEntity])],
    controllers: [ShopController],
    providers: [ShopService],
})
export class ShopModule {}
