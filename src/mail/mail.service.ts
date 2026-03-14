import { AllConfigType } from '@/config/config.type';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private readonly configService: ConfigService<AllConfigType>,
        private readonly mailerService: MailerService,
    ) {}

    async sendEmailVerification(email: string, token: string) {
        const url = `${this.configService.get('app.url', { infer: true })}/api/v1/auth/verify/email?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Email Verification',
            template: 'email-verification',
            context: {
                email: email,
                url,
            },
        });
    }

    async sendResetPasswordEmail(email: string, token: string) {
        const url = `${this.configService.get('app.url', { infer: true })}/api/v1/reset-password?token=${token}`;
        //const url = `${this.configService.get('app.url')}/reset-password?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password',
            template: 'reset-password',
            context: {
                email,
                url,
            },
        });

    }
}
