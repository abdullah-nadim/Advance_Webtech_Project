import { Entity, Column, PrimaryGeneratedColumn,ManyToMany, OneToOne ,JoinColumn, PrimaryColumn, JoinTable } from 'typeorm';
import { JudgeEntity } from './judge.entity';
import { IdeaEntity } from './idea.entity';
import { IsDate, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

@Entity('Presentations')
export class PresentationEntity {

  @IsNotEmpty()
  @IsNumber()
  @PrimaryColumn()
  presentation_id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z\s]+$/,{ message: "Title starts with number  " })
  @Column()
  presentation_timeslot: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  presentation_rating: number;

  @IsNotEmpty()
  @Column()
  presentation_sheduleddate: Date;


  @ManyToMany(() => JudgeEntity, judgeEntity => judgeEntity.presentationEntitys)
  @JoinTable()
  judgeEntitys: JudgeEntity[];

  @OneToOne(() => IdeaEntity, ideaEntity => ideaEntity.presentation)
  ideaEntity: IdeaEntity;

  
 
}