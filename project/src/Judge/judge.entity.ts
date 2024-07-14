import { Entity, Column, PrimaryGeneratedColumn, OneToOne,OneToMany, ManyToMany,JoinColumn, PrimaryColumn } from 'typeorm';
import { JudgeProfile } from './judge.profile'; 
import { FeedbackEntity } from './feedback.entity';
import { PresentationEntity } from './presentation.entity';
import { InvestmentEntity } from './investment.entity';
import { SubmissionEntity } from "./submission.entity"; 
import { NotificationEntity } from './notification.entity';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';

@Entity('Judge')
export class JudgeEntity {

  @IsNotEmpty()
  @IsNumber()
  @PrimaryColumn()
  judge_id: number;

  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/, { message: "Please enter a A-Z or a-z with no space, no special character is allowed" })
  @Column()
  judge_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  judge_email: string;

  @IsNotEmpty()
  @MinLength(4, { message: "Password must be at least 4 characters long" })
  @Matches(/[a-z]/,{ message: "Password must contain at least one lowercase letter" })
  @Column()
  judge_password: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  judge_gender: string;

  @OneToOne(() => JudgeProfile, judgeProfile => judgeProfile.judgeEntity, { cascade: true , eager: true
  })
   @JoinColumn({name:"profile_id"})
   judgeProfile: JudgeProfile;

 

   @ManyToMany(() => FeedbackEntity, feedbackEntity => feedbackEntity.judgeEntitys)
  feedbackEntitys: FeedbackEntity[];

  @ManyToMany(() => PresentationEntity, presentationEntity => presentationEntity.judgeEntitys)
  presentationEntitys: PresentationEntity[];

  @ManyToMany(() => InvestmentEntity, investmentEntity => investmentEntity.judgeEntitys)
  investmentEntitys: InvestmentEntity[];

  @ManyToMany(() => SubmissionEntity, submissionEntity => submissionEntity.judgeEntitys)
  submissionEntitys: SubmissionEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.judge, { cascade: true })
  notifications: NotificationEntity[];

}