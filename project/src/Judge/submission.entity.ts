import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany,OneToOne } from "typeorm";
import { JudgeEntity } from "src/Judge/judge.entity";
import { IdeaEntity } from "./idea.entity";
import { IsDate, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";


@Entity("Submission")
export class SubmissionEntity{

@IsNotEmpty()
@IsNumber()  
@PrimaryColumn()
submission_id: number;

@IsNotEmpty()
@IsString()
@Matches(/^[a-zA-Z0-9]+$/,{ message: "Title starts with letter  " })
@Column()
submission_title: string;

@IsNotEmpty()
  @IsNumber()
@Column()
submission_score: number;

@IsNotEmpty()
@IsString()
@Matches(/^[a-zA-Z0-9]+$/,{ message: "Review starts with letter  " })
@Column()
submission_review: string;

@IsNotEmpty()
@Column()
lastsubmission: Date;



@ManyToMany(() => JudgeEntity, judgeEntity => judgeEntity.submissionEntitys)
  @JoinTable()
  judgeEntitys: JudgeEntity[];


  @OneToOne(() => IdeaEntity, ideaEntity => ideaEntity.submissionEntity)
  ideaEntity: IdeaEntity;

}
