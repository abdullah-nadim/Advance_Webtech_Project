import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { NotificationEntity } from './notification.entity';

@Entity('Entrepreneur')
export class EntrepreneurEntity {
  @PrimaryGeneratedColumn({ name: 'EntrepreneurID', type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @OneToOne(() => IdeaEntity, (ideaEntity) => ideaEntity.entrepreneurEntity, {
    cascade: true,
  })
  ideaEntity: IdeaEntity;

//   @OneToMany(
//     () => NotificationEntity,
//     (notification) => notification.entrepreneur,
//   )
//   notifications: NotificationEntity[];
}
