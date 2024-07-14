import { Module } from '@nestjs/common';
import { EntrepreneurController } from './entrepreneur.controller';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurEntity } from './entrepreneur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { EntrepreneurEntity } from "src/Entrepreneur/entrepreneur.entity";
// import { SubmissionEntity } from "src/Entrepreneur/submission.entity";
// import { ReviewEntity } from "src/Entrepreneur/review.entity";
// import { MailService } from "./mail.service";
import { SendResetCodeDto } from './send-reset-code.dto';
import { EntrepreneurLoginDTO } from './entrepreneur.logindto';
import { IdeaEntity } from './idea.entity';
import { MailService } from './mail.service';
import { NotificationService } from './notification.service';
import { NotificationEntity } from './notification.entity';
import { PrototypeEntity } from './prototype.entity';
import { PresentationEntity } from './presentation.entity';
import { FeedbackEntity } from 'src/Judge/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntrepreneurEntity,
      SendResetCodeDto,
      EntrepreneurLoginDTO,
      IdeaEntity,
      NotificationEntity,
      PrototypeEntity,
      PresentationEntity,
      FeedbackEntity
    ]),
  ],
  controllers: [EntrepreneurController],
  providers: [EntrepreneurService , MailService,NotificationService],
  exports: [EntrepreneurService],
})
export class EntrepreneurModule {}
