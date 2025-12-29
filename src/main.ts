import {
    ClassSerializerInterceptor,
    HttpStatus,
    RequestMethod,
    UnprocessableEntityException,
    ValidationError,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AdminService } from './modules/admin/admin.service';
import { AppModule } from './app.module';
import { type AllConfigType } from './config/config.type';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import setupSwagger from './utils/setup-swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    app.useLogger(app.get(Logger));

    //Setup sercurity headers
    app.use(helmet());

    // For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx). In that case, you should not use compression middleware.
    app.use(compression());

    const configService = app.get(ConfigService<AllConfigType>);
    const reflector = app.get(Reflector);
    const isDevelopment =
        configService.getOrThrow('app.nodeEnv', { infer: true }) === 'development';
    const corsOrigin = configService.getOrThrow('app.corsOrigin', {
        infer: true,
    });
    
    const allowedOrigins = [
        'http://localhost:4000',
        'http://dotstore.vn',
        'https://dotstore.vn',
        'https://www.dotstore.vn',
        'https://admin.dotstore.vn',
    ];

    app.enableCors({
        origin: (origin, callback) => {
            // Cho phép swagger, postman, curl (origin = undefined)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS blocked origin: ${origin}`), false);
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      //  allowedHeaders: 'Content-Type, Accept',
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Api-Key'],
        credentials: true,
    });
    console.info('CORS Origin:', corsOrigin);

    // Use global prefix if you don't have subdomain
    app.setGlobalPrefix(
        configService.getOrThrow('app.apiPrefix', { infer: true }),
        {
        exclude: [
            { method: RequestMethod.GET, path: '/' },
            { method: RequestMethod.GET, path: 'health' },
        ],
        },
    );

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.useGlobalGuards(new AuthGuard(reflector, app.get(AdminService)));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            exceptionFactory: (errors: ValidationError[]) => {
                return new UnprocessableEntityException(errors);
            },
        }),
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    if (isDevelopment) {
        setupSwagger(app);
    }

    await app.listen(configService.getOrThrow('app.port', { infer: true }));

    console.info(`Server running on ${await app.getUrl()}`);

    return app;
    }

    void bootstrap();
