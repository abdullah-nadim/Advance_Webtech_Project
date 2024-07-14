import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IdeaEntity } from './idea.entity';

@Entity('Prototype')
export class PrototypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  details: string;

  @ManyToOne(() => IdeaEntity, (ideaEntity) => ideaEntity.prototypeEntities)
  @JoinColumn({ name: 'IdeaID' })
  ideaEntity: IdeaEntity;
}
