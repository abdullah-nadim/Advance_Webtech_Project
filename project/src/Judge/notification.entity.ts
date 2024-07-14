import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { JudgeEntity } from "src/Judge/judge.entity";


@Entity("Notifications")
export class NotificationEntity{
@PrimaryColumn()
notification_id: number;
@Column()
notification_message: string;
@Column()
notification_date: Date;


@ManyToOne(() => JudgeEntity, judge => judge.notifications)
judge: JudgeEntity;
  feedbackEntitys: any;


}
