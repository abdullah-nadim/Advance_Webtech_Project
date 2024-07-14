import { Entity, Column, PrimaryGeneratedColumn, OneToOne ,JoinColumn, PrimaryColumn } from 'typeorm';
import { JudgeEntity } from './judge.entity';

@Entity('Judge_Profile')
export class JudgeProfile {
  @PrimaryColumn()
  judge_profile_id: number;

  @Column()
  judge_profile_name: string;

  @Column()
  judge_profile_email: string;

  @Column()
  judge_profile_password: string;

  @Column()
  judge_profile_gender: string;

  @OneToOne(() => JudgeEntity, judgeEntity => judgeEntity.judgeProfile)
  judgeEntity: JudgeEntity;

  @OneToOne(() => JudgeProfile)
  @JoinColumn({ name: 'collaborator_id' })
  collaborator: JudgeProfile;
}