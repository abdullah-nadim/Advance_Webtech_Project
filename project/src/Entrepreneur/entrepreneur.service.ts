import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { EntrepreneurEntity } from './entrepreneur.entity';
// import { EntrepreneurEntity } from "src/Entrepreneur/entrepreneur.entity";
// import { SubmissionEntity } from "src/Entrepreneur/submission.entity";
// import { ReviewEntity } from "src/Entrepreneur/review.entity";
import * as bcrypt from 'bcrypt';
import { EntrepreneurLoginDTO } from './entrepreneur.logindto';
import { IdeaEntity } from './idea.entity';
import { MailService } from './mail.service';
import { NotificationService } from './notification.service';
import { PrototypeEntity } from './prototype.entity';
import { PresentationEntity } from './presentation.entity';
import { FeedbackEntity } from 'src/Judge/feedback.entity';

@Injectable()
export class EntrepreneurService {
  constructor(
    @InjectRepository(EntrepreneurEntity)
    private entrepreneurRepository: Repository<EntrepreneurEntity>,
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(PrototypeEntity)
    private readonly prototypeRepository: Repository<PrototypeEntity>,
    @InjectRepository(PresentationEntity)
    private readonly presentationRepository: Repository<PresentationEntity>,
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
    private readonly mailerService: MailService,
    private readonly notificationService: NotificationService,
    // @InjectRepository(SubmissionEntity) private submissionRepository: Repository<SubmissionEntity>,
    // @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>
  ) {}

  async getById(id: number): Promise<EntrepreneurEntity> {
    return this.entrepreneurRepository.findOneBy({ id: id });
  }

  async updateEntrepreneur(
    id: number,
    updatedEntrepreneur: EntrepreneurEntity,
  ): Promise<EntrepreneurEntity> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      updatedEntrepreneur.password,
      salt,
    );
    updatedEntrepreneur.password = hashedPassword;
    await this.entrepreneurRepository.update(id, updatedEntrepreneur);
    return this.entrepreneurRepository.findOneBy({ id: id });
  }

  async updateIdea(id: number, updatedIdea: IdeaEntity): Promise<IdeaEntity> {
    const idea = await this.ideaRepository.findOne({
      where: { ideaId: id },
    });
    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    idea.name = updatedIdea.name;
    idea.description = updatedIdea.description;
    idea.domain = updatedIdea.domain;
    idea.status = "updated Idea";

    return this.ideaRepository.save(idea);
  }

  async deleteEntrepreneur(id: number): Promise<void> {
    await this.entrepreneurRepository.delete(id);
  }

  async getAllFAQ(): Promise<PresentationEntity[]> {
    return this.presentationRepository.find();
  }

  async prototypeInfo(
    pid: number,
    prototypeEntity: PrototypeEntity,
  ): Promise<any> {
    const idea = await this.ideaRepository.findOne({
      where: { ideaId: pid },
    });

    if (!idea) {
      throw new Error('Idea not found');
    }
    prototypeEntity.ideaEntity = idea;
    await this.prototypeRepository.save(prototypeEntity);
    idea.status = 'Prototype Submitted';
    await this.ideaRepository.save(idea);
    await this.notificationService.createNotification(
      'Prototype information uploaded!',
      pid,
    );
    return prototypeEntity;
  }

  ///************session

  //   async createsessionJudge(myobj: JudgeEntity): Promise<JudgeEntity>{
  //     const salt= await bcrypt.genSalt();
  //     const hashedPassword= await bcrypt.hash(myobj.judge_password,salt);
  //     myobj.judge_password= hashedPassword;
  //     return this.judgeRepository.save(myobj);

  //   }

  // async sessionlogin(myobj:EntrepreneurLoginDTO): Promise<boolean>{

  // const judge= await this.judgeRepository.findOneBy({judge_email:myobj.email});
  // if(judge)
  // {
  //   const isMatch= await bcrypt.compare(myobj.password,judge.judge_password);
  //   if(isMatch)
  //   {
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  ///}

  ///**********jwt

  async createAuthJudge(entrepreneurEntity: EntrepreneurEntity): Promise<any> {
    /// judgeProfile.judgeEntity = judgeEntity;
    /// await this.judgeProfileRepository.save(judgeProfile);
    await this.entrepreneurRepository.save(entrepreneurEntity);
    return this.mailerService.sendSuccess(entrepreneurEntity);
  }

  async submitIdea(eid: number, ideaEntity: IdeaEntity): Promise<any> {
    const entrepreneur = await this.entrepreneurRepository.findOne({
      where: { id: eid },
      relations: ['ideaEntity'],
    });

    if (!entrepreneur) {
      throw new Error('Entrepreneur not found');
    }

    ideaEntity.entrepreneurEntity = entrepreneur;
    ideaEntity.status = 'Submitted'; // Set the status to 'Submitted'
    await this.ideaRepository.save(ideaEntity);
    await this.notificationService.createNotification('Idea Submitted', eid);
    return ideaEntity;
  }

  async findOne(email: string): Promise<EntrepreneurEntity> {
    return this.entrepreneurRepository.findOneBy({ email });
  }

  async submitPresentation(
    pid: number,
    presentationEntity: PresentationEntity,
  ): Promise<any> {
    const idea = await this.ideaRepository.findOne({
      where: { ideaId: pid },
      //relations: ['presentations'],
    });

    if (!idea) {
      throw new Error('Idea not found');
    }
    //console.log(idea);
    // const presentation = new PresentationEntity();
    // presentation = presentationEntity;
    // presentation.idea = idea;

    presentationEntity.ideaEntity = idea;
    await this.presentationRepository.save(presentationEntity);

    // Update the status of the idea
    idea.status = 'Presentation Scheduled'; // Update status to 'Presentation Scheduled'
    await this.ideaRepository.save(idea);
    await this.notificationService.createNotification(
      'Presentation Scheduled!',
      pid,
    );
    return presentationEntity;
  }

  async getAllFeedback(): Promise<FeedbackEntity[]> {
    return this.feedbackRepository.find();
  }

  async getSubmissionStatus(ideaId: number): Promise<any> {
    const idea = await this.ideaRepository.findOne({
      where: { ideaId },
      relations: ['prototypeEntities', 'presentations', 'notifications'],
    });

    if (!idea) {
      throw new Error(`Idea with ID ${ideaId} not found`);
    }

    // Extract relevant information for submission status
    const submissionStatus = {
      ideaId: idea.ideaId,
      name: idea.name,
      status: idea.status,
      prototypeCount: idea.prototypeEntities.length,
      presentationCount: idea.presentations.length,
      notificationCount: idea.notifications.length,
    };
    return submissionStatus;
  }
}
