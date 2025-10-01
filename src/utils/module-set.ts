/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModule } from 'src/modules/api.module';
// authconfig
import { BackgroundModule } from '@/background/background.module';
import appConfig from 'src/config/app.config';
import { AllConfigType } from 'src/config/config.type';
import { Environment } from 'src/constants/app.constant';
import databaseConfig from '@/database/config/database.config';
import { TypeOrmConfigService } from '@/database/typeorm-config.service';
import mailConfig from '@/mail/config/mail.config';
import { MailModule } from '@/mail/mail.module';
// redis
import { BullModule } from '@nestjs/bullmq';
// cache module
import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// redis store
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import loggerFactory from './logger-factory';

function generateModulesSet() {
  	const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
      isGlobal: true,
      //load: [appConfig, databaseConfig, redisConfig, authConfig, mailConfig],
      load: [appConfig, databaseConfig, mailConfig],
      envFilePath: ['.env'],
    }),
  ];
  let customModules: ModuleMetadata['imports'] = [];

  	const dbModule = TypeOrmModule.forRootAsync({
		useClass: TypeOrmConfigService,
		dataSourceFactory: async (options: DataSourceOptions) => {
			if (!options) {
				throw new Error('Invalid options passed');
			}

			return new DataSource(options).initialize();
		},
	});

  	const loggerModule = LoggerModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: loggerFactory,
  	});

  	const modulesSet = process.env.MODULES_SET || 'monolith';

  	switch (modulesSet) {
		case 'monolith':
			customModules = [
				ApiModule,
				BackgroundModule,
				dbModule,
				loggerModule
			];
			break;
		case 'api':
      		customModules = [
				ApiModule,
				BackgroundModule,
				dbModule,
				loggerModule
			];
      		break;
    	case 'background':
      		customModules = [
				BackgroundModule,
				loggerModule
			];
      	break;
    	default:
      		console.error(`Unsupported modules set: ${modulesSet}`);
      		break;
  }
  return imports.concat(customModules);
}

export default generateModulesSet;
