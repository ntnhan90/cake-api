/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModule } from 'src/modules/api.module';
// authconfig
// BackgroundModule
import appConfig from 'src/config/app.config';
import { AllConfigType } from 'src/config/config.type';
import { Environment } from 'src/constants/app.constant';
//database config
// typeorm
// mail Config
// mail Module
// redis
import { BullModule } from '@nestjs/bullmq';
// cache module
import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
//typeormmodule
// redis store
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import path from 'path';
//  import { DataSource, DataSourceOptions } from 'typeorm';
import loggerFactory from './logger-factory';

function generateModulesSet() {
  const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
      isGlobal: true,
      //load: [appConfig, databaseConfig, redisConfig, authConfig, mailConfig],
      load: [appConfig],
      envFilePath: ['.env'],
    }),
  ];
  let customModules: ModuleMetadata['imports'] = [];

  const loggerModule = LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: loggerFactory,
  });

  const modulesSet = process.env.MODULES_SET || 'monolith';

  switch (modulesSet) {
    case 'monolith':
      customModules = [ApiModule, loggerModule];
      break;
    case 'api':
      customModules = [ApiModule, loggerModule];
      break;
    case 'background':
      customModules = [loggerModule];
      break;
    default:
      console.error(`Unsupported modules set: ${modulesSet}`);
      break;
  }
  return imports.concat(customModules);
}

export default generateModulesSet;
