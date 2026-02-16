import { Module } from '@nestjs/common';
import { FranchiseService } from './franchise.service';
import { FranchiseController } from './franchise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranchiseEntity } from './entities/franchise.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FranchiseEntity])],
    controllers: [FranchiseController],
    providers: [FranchiseService],
})
export class FranchiseModule {}
