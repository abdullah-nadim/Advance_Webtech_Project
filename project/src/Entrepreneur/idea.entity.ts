import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EntrepreneurEntity } from './entrepreneur.entity';
import { PrototypeEntity } from './prototype.entity';
import { PresentationEntity } from './presentation.entity';
import { NotificationEntity } from './notification.entity';

@Entity('Idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn({ name: 'IdeaID', type: 'int' })
  ideaId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  domain: string;

  @Column()
  status: string;

  @OneToOne(
    () => EntrepreneurEntity,
    (entrepreneurEntity) => entrepreneurEntity.ideaEntity,
  )
  @JoinColumn({ name: 'EntrepreneurID' })
  entrepreneurEntity: EntrepreneurEntity;

  @OneToMany(
    () => PrototypeEntity,
    (prototypeEntity) => prototypeEntity.ideaEntity,
    { cascade: true },
  )
  prototypeEntities: PrototypeEntity[];

  @OneToMany(
    () => PresentationEntity,
    (presentationEntity) => presentationEntity.ideaEntity,
    { cascade: true },
  )
  presentations: PresentationEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.idea)
  notifications: NotificationEntity[];
}
