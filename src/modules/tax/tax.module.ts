import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { TaxEntity } from './entities/tax.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxRepository } from './repo/tax.repo';

@Module({
    imports: [TypeOrmModule.forFeature([TaxEntity])],
    controllers: [TaxController],
    providers: [TaxService,TaxRepository],
})
export class TaxModule {}
