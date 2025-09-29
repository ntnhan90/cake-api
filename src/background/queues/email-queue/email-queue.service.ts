import { IVerifyEmailJob } from "@/common/interfaces/job.interface";
import { MailService } from "@/mail/mail.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EmailQueueService {
    private readonly logger = new Logger(EmailQueueService.name);
    
    constructor(private readonly mailService: MailService) {}

    async sendEmailVerificationEmail(data: IVerifyEmailJob): Promise<void> {
        this.logger.log(`Sending email verification to ${data.email}`);
        
        try {
            await this.mailService.sendEmailVerification(data.email, data.token);
        } catch (error) {
            this.logger.error(`Failed to send email to ${data.email}`, error);
            throw error; // Re-throw the error for further handling if needed
        }
    }
}