import { Module } from '@nestjs/common';
import { FranchiseService } from './franchise.service';
import { FranchiseController } from './franchise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranchiseEntity } from './entities/franchise.entity';
import { ContractEntity } from './entities/contract.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FranchiseEntity, ContractEntity])],
    controllers: [FranchiseController],
    providers: [FranchiseService],
})
export class FranchiseModule {}
