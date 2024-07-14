import { Entity, Column, PrimaryColumn, OneToMany,OneToOne,JoinColumn } from "typeorm";
import { JudgeEntity } from "src/Judge/judge.entity";
import { FeedbackEntity } from "./feedback.entity";
import { PresentationEntity } from "./presentation.entity";
import { InvestmentEntity } from "./investment.entity";
import { SubmissionEntity } from "./submission.entity";
import { IsNotEmpty, Matches } from "class-validator";


@Entity("Ideas")
export class IdeaEntity{

@IsNotEmpty()
@PrimaryColumn()
idea_id: number;


@IsNotEmpty()
@Matches(/^[A-Za-z0-9\s]+$/,{ message: "Description starts with letter  " })
@Column()
idea_description: string;


@IsNotEmpty()
@Matches(/^[A-Za-z0-9]+$/,{ message: "Title starts with letter with no space " })
@Column()
idea_title: string;


@IsNotEmpty()
@Column()
idea_scheduleddate: Date;




@OneToMany(() => FeedbackEntity, feedbackEntity => feedbackEntity.ideaEntity, { cascade: true })
feedbackEntitys: FeedbackEntity[];


@OneToOne(() => PresentationEntity, presentation => presentation.ideaEntity, { cascade: true })
@JoinColumn()
  presentation: PresentationEntity;

  @OneToOne(() => InvestmentEntity, investment => investment.ideaEntity, { cascade: true })
@JoinColumn()
  investment: InvestmentEntity;

  @OneToOne(() => SubmissionEntity, submissionEntity => submissionEntity.ideaEntity, { cascade: true })
@JoinColumn()
submissionEntity: SubmissionEntity;
}
