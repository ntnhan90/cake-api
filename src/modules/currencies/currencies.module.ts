import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyRepository } from './repo/currencies.repo';
@Module({
    imports: [TypeOrmModule.forFeature([CurrencyEntity])],
    controllers: [CurrenciesController],
    providers: [CurrenciesService,CurrencyRepository],
})
export class CurrenciesModule {}
