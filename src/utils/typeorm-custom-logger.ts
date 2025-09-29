/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import {
    QueryRunner,
    Logger as TypeOrmLoggger,
    type LogLevel,
    type LogMessageType,
    type LoggerOptions
} from 'typeorm'

class TypeOrmCustomLogger implements TypeOrmLoggger{
    static getInstance(connectionName: string, options: LoggerOptions){
        const logger = new Logger(`TypeORM[${connectionName}]`);
        return new TypeOrmCustomLogger(logger, options);
    }

    constructor(
        private readonly logger: Logger,
        private readonly options: LoggerOptions,
    ) {}

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if(!this.isLogEnabledFor('query')){
            return;
        }

        const sql =
            query + ( parameters && parameters.length
                ? '-- PARAMETERS: ' + this.stringifyParams(parameters)
                : '')
        this.logger.log(`query: ${sql}`);        
    }

    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if(!this.isLogEnabledFor('query-error')){
            return;
        }

        const sql = query + (parameters && parameters.length
            ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
            : ''
        )
        this.logger.error(`query failed: ${sql}`);
        this.logger.error(`error:`, error);
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if (!this.isLogEnabledFor('query-slow')) {
            return;
        }
      
        const sql =
            query + (parameters && parameters.length
              ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
              : ''
        );
        this.logger.warn(`query is slow: ${sql}`);
        this.logger.warn(`excution time: ${time}`);
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        if (!this.isLogEnabledFor('schema-build')) {
            return;
        }
      
        this.logger.log(message);
    }

    logMigration(message: string, queryRunner?: QueryRunner) {
        if (!this.isLogEnabledFor('migration')) {
          return;
        }
    
        this.logger.log(message);
    }

    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
        switch (level) {
          case 'log':
            if (!this.isLogEnabledFor('log')) {
              return;
            }
    
            this.logger.log(message);
            break;
          case 'info':
            if (!this.isLogEnabledFor('info')) {
              return;
            }
    
            this.logger.log(message);
            break;
          case 'warn':
            if (!this.isLogEnabledFor('warn')) {
              return;
            }
    
            this.logger.warn(message);
            break;
        }
    }

    protected isLogEnabledFor(type?: LogLevel | LogMessageType){
        switch(type) {
            case 'query':
                return(
                    this.options === 'all' ||
                    this.options === true ||
                    (Array.isArray(this.options) && this.options.indexOf('query') !== -1)        
                );
            case 'error':
            case 'query-error':
                return (
                    this.options === 'all' ||
                    this.options === true ||
                    (Array.isArray(this.options) && this.options.indexOf('error') !== -1)
                );
            case 'query-slow':
                return true;
            case 'schema':
            case 'schema-build':
                return (
                    this.options === 'all' ||
                    (Array.isArray(this.options) && this.options.indexOf('schema') !== -1)
                );
            case 'migration':
                return true;
            case 'log':
                return(
                    this.options === 'all' ||
                    (Array.isArray(this.options) && this.options.indexOf('log') !== -1)
                )
            case 'info':
                return (
                    this.options === 'all' ||
                    (Array.isArray(this.options) && this.options.indexOf('info') !== -1)
                );
            case 'warn':
                return (
                    this.options === 'all' ||
                    (Array.isArray(this.options) && this.options.indexOf('warn') !== -1)
                );
            default:
                return false;
        }
    }

    protected stringifyParams(parameters: any[]){
        try{
            return JSON.stringify(parameters);
        }catch(error) {
            return parameters;
        }
    }
}

export default TypeOrmCustomLogger