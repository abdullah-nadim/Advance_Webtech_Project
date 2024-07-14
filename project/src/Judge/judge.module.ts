import { Module } from '@nestjs/common';
import { JudgeController } from './judge.controller';
import { JudgeService } from './judge.service';
import { JudgeEntity } from './judge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionEntity } from './submission.entity';
import { MailService } from './mail.service';
import { JudgeLoginDTO } from './judge.logindto';
import { JudgeProfile } from './judge.profile';
import { FeedbackEntity } from './feedback.entity';
import { PresentationEntity } from './presentation.entity';
import { InvestmentEntity } from './investment.entity';
import { NotificationEntity } from './notification.entity';
import { IdeaEntity } from './idea.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JudgeEntity,
      FeedbackEntity,
      IdeaEntity,
      NotificationEntity,
      InvestmentEntity,
      PresentationEntity,
      JudgeProfile,
      SubmissionEntity,
      JudgeLoginDTO,
    ]),
  ],
  controllers: [JudgeController],
  providers: [JudgeService, MailService],
  exports: [JudgeService],
})
export class JudgeModule {}
