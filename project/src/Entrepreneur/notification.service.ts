import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import { IdeaEntity } from './idea.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  async createNotification(
    details: string,
    ideaId: number,
  ): Promise<NotificationEntity> {
    // Find the idea by its ID
    const idea = await this.ideaRepository.findOne({where : {ideaId}});

    if (!idea) {
      throw new Error(`Idea with ID ${ideaId} not found`);
    }

    // Create a new notification associated with the idea
    const notification = new NotificationEntity();
    notification.details = details;
    notification.idea = idea;

    // Save the notification to the database
    return this.notificationRepository.save(notification);
  }

  async getAllNotifications(): Promise<NotificationEntity[]> {
    return this.notificationRepository.find();
  }
}
