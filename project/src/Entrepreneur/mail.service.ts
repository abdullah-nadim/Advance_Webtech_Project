import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendResetCodeDto } from './send-reset-code.dto';
import { EntrepreneurEntity } from './entrepreneur.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetCode(sendResetCodeDto: SendResetCodeDto): Promise<void> {
    const { email, code } = sendResetCodeDto;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Code',
      text: `Your reset code is: ${code}`,
    });
  }

  async sendSuccess(entrepreneurEntity: EntrepreneurEntity): Promise<void> {
    const { email, name } = entrepreneurEntity;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Registration Successful',
      text: `Your reset registration is succesful, Dear ${name}`,
    });
  }
}