import { Entity, Column, PrimaryGeneratedColumn,ManyToMany, OneToOne ,JoinColumn, PrimaryColumn, JoinTable } from 'typeorm';
import { JudgeEntity } from './judge.entity';
import { IdeaEntity } from './idea.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('Investment')
export class InvestmentEntity {
  @IsNotEmpty()
  @PrimaryColumn()
  investment_id: number;

  @IsNotEmpty()
  @Column()
  investment_date: string;

  @IsNotEmpty()
  @Column()
  investment_amount: number;

  @ManyToMany(() => JudgeEntity, judgeEntity => judgeEntity.investmentEntitys)
  @JoinTable()
  judgeEntitys: JudgeEntity[];

  @OneToOne(() => IdeaEntity, ideaEntity => ideaEntity.investment)
  ideaEntity: IdeaEntity;

 
}