import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EntrepreneurEntity } from './entrepreneur.entity';
import { IdeaEntity } from './idea.entity';

@Entity('Notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  details: string;

//   @ManyToOne(
//     () => EntrepreneurEntity,
//     (entrepreneur) => entrepreneur.notifications,
//   )
//   entrepreneur: EntrepreneurEntity;

  @ManyToOne(() => IdeaEntity, (idea) => idea.notifications)
  idea: IdeaEntity;
}
