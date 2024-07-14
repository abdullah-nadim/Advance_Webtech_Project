import { Entity, Column, ManyToOne,ManyToMany, OneToOne ,JoinColumn, PrimaryColumn, JoinTable } from 'typeorm';
import { JudgeEntity } from './judge.entity';
import { IdeaEntity } from './idea.entity';
import { IsNotEmpty, Matches } from 'class-validator';

@Entity('Feedback')
export class FeedbackEntity {
  @IsNotEmpty()
  @PrimaryColumn()
  feedback_id: number;

  @IsNotEmpty()
  @Column()
  @Matches(/^[A-Za-z0-9]+$/,{ message: "Title starts with letter  " })
  feedback_title: string;

  @IsNotEmpty()
  @Column()
  feedback_rating: number;

  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9*\s]+$/,{ message: "Feedback starts with letter  " })
  @Column()
  feedback: string;


  @ManyToMany(() => JudgeEntity, judgeEntity => judgeEntity.feedbackEntitys)
  @JoinTable()
  judgeEntitys: JudgeEntity[];

  @ManyToOne(() => IdeaEntity, ideaEntity => ideaEntity.feedbackEntitys)
  ideaEntity: IdeaEntity;

 
}