import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IdeaEntity } from './idea.entity';

@Entity('Presentation')
export class PresentationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => IdeaEntity, (ideaEntity) => ideaEntity.presentations)
  @JoinColumn({ name: 'IdeaID' })
  ideaEntity: IdeaEntity;

  @Column()
  timeslot: string;

  @Column()
  scheduleDate: Date;

  @Column({ nullable: true })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}
