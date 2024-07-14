import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetCode(judge_email:string,idea_title:string): Promise<void> {

    await this.mailerService.sendMail({
      to: judge_email,
      subject: 'Regarding Investment',
      text: "You have invest ****** amount int "+idea_title+" business",
    });
  }
}