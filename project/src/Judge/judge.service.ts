import  { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, IsNull } from 'typeorm';
import { JudgeEntity } from "./judge.entity";
// import { EntrepreneurEntity } from "src/Entrepreneur/entrepreneur.entity";
import { SubmissionEntity } from "./submission.entity"; 
// import { ReviewEntity } from "src/Entrepreneur/review.entity";
import * as bcrypt from "bcrypt";
import { JudgeLoginDTO } from "./judge.logindto";
import { JudgeProfile } from "./judge.profile";
import { FeedbackEntity } from "./feedback.entity";
import { PresentationEntity } from "./presentation.entity";
import { InvestmentEntity } from "./investment.entity";
import { NotificationEntity } from "./notification.entity";
import { IdeaEntity } from "./idea.entity";
import { devNull } from "os";



@Injectable()
export class JudgeService {
  constructor(@InjectRepository(JudgeEntity) private judgeRepository: Repository<JudgeEntity>,
  @InjectRepository(JudgeProfile) private judgeProfileRepository: Repository<JudgeProfile>,
  @InjectRepository(FeedbackEntity) private feedbackRepository: Repository<FeedbackEntity>,
  @InjectRepository(SubmissionEntity) private submissionRepository: Repository<SubmissionEntity>,
  //@InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
  @InjectRepository(PresentationEntity) private presentationRepository: Repository<PresentationEntity>,
  @InjectRepository(InvestmentEntity) private investmentRepository: Repository<InvestmentEntity>,
  @InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>,
  @InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>,
  

) {}

    
//   getJudgebyId(id: number): object {
//     return {
//       message : 'Judge id'+id
//     };
//   }

//   getJudgebyNameAndId(name: string, id: number): object {
//     return {
//       message : 'Judge name='+name+' id= '+id
//     };
//   }

//   getJudge(myobj:object): object {
//     return myobj;
//   }

//   // addJudge(myobj:object): object {
//   //   return myobj;
//   // }

//   // updateJudge(myobj:object, id: number): object {
//   //   return {
//   //     message : 'Update judge id='+id, body:myobj
//   //   };
//   // }

//   searchJudge(myobj:object, name: string): object {
//     return {
//       message : 'Search judge name='+name, body:myobj
//     };
//   }

//   // deleteJudge(myobj:object, name: string): object {
//   //   return {
//   //     message : "Judge deleted successfully", body: myobj 
//   //   };
//   // }

//   async createJudge(judgeEntity: JudgeEntity): Promise<JudgeEntity> {
//     return this.judgeRepository.save(judgeEntity);
//     }

//     async getAllJudges(): Promise<JudgeEntity[]> {
//       return this.judgeRepository.find();
//       }
    
//       async getJudgeById(id: number): Promise<JudgeEntity> {
//         return this.judgeRepository.findOneBy({id:id});
//         }
    
//   async updateJudge(id: number, updatedJudge: JudgeEntity): Promise<JudgeEntity> {
//   await this.judgeRepository.update(id, updatedJudge);
//   return this.judgeRepository.findOneBy({id:id}); 
// }
          
// async deleteJudge(id: number): Promise<void> {
//   await this.judgeRepository.delete(id);
// }
          
// async getEntityWithSelectedFields(): Promise<Partial<JudgeEntity>[]> {
//   return this.judgeRepository.find({
//     select: {
//       name: true,
//     },
//   });
// }


// async getEntityWithor(): Promise<Partial<JudgeEntity>[]> {
//   return this.judgeRepository.find({
//     where: [
//       { name: "saba" },
//       { id: 1 },
//     ],
//   });
// }

// async getEntityWithand(): Promise<Partial<JudgeEntity>[]> {
//   return this.judgeRepository.find({
//     where:
//     {  name: "saba",
//       id: 1},
    
//     });
    
// }

// async getEntityWithorder(): Promise<Partial<JudgeEntity>[]> {
//   return this.judgeRepository.find({ 
//     order: {
//     name: "ASC",
//     id: "DESC",
//     },
//     })
//     ;
    
// }

// async getEntityWithlike(): Promise<Partial<JudgeEntity>[]> {
//   return this.judgeRepository.find({
//     where: {
//       name: Like('sa%'), // Using Like operator to find names starting with 'sa'
//     },
//   });
// }



// async createEnrepreneur(entrepreneurEntity: EntrepreneurEntity): Promise<EntrepreneurEntity> {
//   return this.entrepreneurRepository.save(entrepreneurEntity);
//   }



//   async getAllEntrepreneur(): Promise<EntrepreneurEntity[]> {
//     return this.entrepreneurRepository.find({ relations: ['submissionEntitys'] });
//     }

//     async createSubmission(enrepreneurid, submissionEntity : SubmissionEntity): Promise<SubmissionEntity> {
//     submissionEntity.entrepreneurEntity = enrepreneurid;
//     return this.submissionRepository.save(submissionEntity);
//     }
//     async getSubmissionsByEntrepreneurId(enrepreneurid: number): Promise<SubmissionEntity[]> {
//     return this.submissionRepository.find({ where: { entrepreneurEntity: { id: enrepreneurid } } });
//     }
    
//     async createReview(judgeId, submissionId, reviewEntity: ReviewEntity): Promise<ReviewEntity> {
    
//       reviewEntity.judgeEntity = judgeId;
//       reviewEntity.submissionEntity = submissionId;
//       return this.reviewRepository.save(reviewEntity);
//     }







///************session

  async createsessionJudge(myobj: JudgeEntity): Promise<JudgeEntity>{
    const salt= await bcrypt.genSalt();
    const hashedPassword= await bcrypt.hash(myobj.judge_password,salt);
    myobj.judge_password= hashedPassword;
    return this.judgeRepository.save(myobj);

  }

  
async sessionlogin(myobj:JudgeLoginDTO): Promise<boolean>{

const judge= await this.judgeRepository.findOneBy({judge_email:myobj.email});
if(judge)
{
  const isMatch= await bcrypt.compare(myobj.password,judge.judge_password);
  if(isMatch)
  {
    return true;
  }
  else{
    return false;
  }
}

}


///**********jwt


//register judge
 async createAuthJudge(judgeEntity: JudgeEntity, judgeProfile: JudgeProfile): Promise<JudgeEntity> {
  
  await this.judgeProfileRepository.save(judgeProfile);
  return this.judgeRepository.save(judgeEntity);
}

//login judge
async findOne(judge_email: string): Promise<JudgeEntity> {
  const judge = await this.judgeRepository.findOne({ where: { judge_email } });

  if (judge) {
    const notification = new NotificationEntity();
    notification.notification_id = judge.judge_id;
    notification.notification_message = 'You successfully logged in!';
    notification.notification_date=new Date();
    notification.judge = judge;
    await this.notificationRepository.save(notification);
  }
  return this.judgeRepository.findOneBy({ judge_email });

}


//check notification
async checkNotificationsByJudge(judge_id: number): Promise<NotificationEntity[]> {
  return this.notificationRepository.find({ where: { notification_id: judge_id  } });
}

//search judge profile
async getJudgeProfile(judge_id: number): Promise<JudgeProfile> {
  return this.judgeProfileRepository.findOne({where: { judge_profile_id: judge_id }});
}


//update judge profile
async updateJudge(judge_profile_id: number, updatedProfile: JudgeProfile): Promise<JudgeProfile> {
  await this.judgeProfileRepository.update(judge_profile_id, updatedProfile);
  const judgeEntity = await this.judgeRepository.findOne({where: { judge_id: judge_profile_id  },relations: ['judgeProfile'],});
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(updatedProfile.judge_profile_password, salt);
    judgeEntity.judge_password = hashedPassword;
    judgeEntity.judgeProfile=updatedProfile;
  this.judgeRepository.save(judgeEntity);
  return this.judgeProfileRepository.findOne({where: { judge_profile_id:judge_profile_id }});
}

//add collaborator
async addCollaborator(judge_profile_id: number, judge_collaborator_id: number): Promise<{ message: string }> {
  const judgeProfile = await this.judgeProfileRepository.findOne({ where: { judge_profile_id } });
  const collaborator = await this.judgeProfileRepository.findOne({ where: { judge_profile_id: judge_collaborator_id } });

  judgeProfile.collaborator = collaborator;

  await this.judgeProfileRepository.save(judgeProfile);

  return { message: "Collaborator is added" };
}


///ideas
async createIdea(ideaEntity: IdeaEntity): Promise<IdeaEntity> {
  return this.ideaRepository.save(ideaEntity);
  }

///create feedback
async giveFeedback(idea_id: number, judge_id: number,feedbackEntity: FeedbackEntity): Promise<{ message: string }> {
  const idea = await this.ideaRepository.findOne({ where: { idea_id }, relations: ['feedbackEntitys'] });
  const judge = await this.judgeRepository.findOne({ where: { judge_id }, relations: ['feedbackEntitys'] });

  feedbackEntity.ideaEntity = idea;
  feedbackEntity.judgeEntitys= [judge];
 
  await this.feedbackRepository.save(feedbackEntity);
  return { message: "Feedback is added" };
  }

  ///delete feedback
  async deleteFeedback(feedback_id: number, judge_id: number, idea_id: number): Promise<{ message: string }> {
    const feedback = await this.feedbackRepository.findOne({where: { feedback_id },relations: ['judgeEntitys', 'ideaEntity'],
    });
  
    const judge = await this.judgeRepository.findOne({ where: { judge_id },relations: ['feedbackEntitys'],});
  
    const idea = await this.ideaRepository.findOne({where: { idea_id },relations: ['feedbackEntitys'],});
    judge.feedbackEntitys = judge.feedbackEntitys.filter(f => f.feedback_id !== feedback_id);
    await this.judgeRepository.save(judge);
    idea.feedbackEntitys = idea.feedbackEntitys.filter(f => f.feedback_id !== feedback_id);
    await this.ideaRepository.save(idea);
    await this.feedbackRepository.remove(feedback);
  
    return { message: "Feedback is deleted" };
  }
  // async getFeedbacksWithJudgeEntitys(): Promise<FeedbackEntity[]> {
  // return this.feedbackRepository.find({ relations: ['judgeEntitys'] });
  // }

/// add rating
async addRatePresentationToJudge(idea_id: number,judge_id: number,presentationEntity: PresentationEntity): Promise<{ message: string }> {
  const idea = await this.ideaRepository.findOne({ where: { idea_id },relations: ['presentation'],});
  const judge = await this.judgeRepository.findOne({ where: { judge_id }, relations: ['presentationEntitys'] });


  presentationEntity.ideaEntity=idea;
  presentationEntity.judgeEntitys= [judge];
 
  await this.presentationRepository.save(presentationEntity);
  return { message: "Rating is added" };
}

  ///delete rating
  async removeRatePresentationFromJudge(presentation_id: number, judge_id: number, idea_id: number): Promise<{ message: string }> {
    const presentation = await this.presentationRepository.findOne({where: { presentation_id },relations: ['judgeEntitys', 'ideaEntity'],});
    const judge = await this.judgeRepository.findOne({where: { judge_id },relations: ['presentationEntitys'],});
  
    const idea = await this.ideaRepository.findOne({where: { idea_id },relations: ['presentation'],});
  
    judge.presentationEntitys = judge.presentationEntitys.filter(f => f.presentation_id !== presentation_id);
    await this.judgeRepository.save(judge);
   idea.presentation=null;
    await this.ideaRepository.save(idea);
    await this.presentationRepository.remove(presentation);
  
    return { message: "Rating is deleted" };
  }



/// add invest
async giveInvesmentToJudge(idea_id: number,judge_id: number,investmentEntity: InvestmentEntity): Promise<{message:string}> {
  const idea = await this.ideaRepository.findOne({ where: { idea_id }, relations: ['investment'] });
  const judge = await this.judgeRepository.findOne({ where: { judge_id }, relations: ['investmentEntitys'] });


  investmentEntity.ideaEntity=idea;
  investmentEntity.judgeEntitys= [judge];
 
  await this.investmentRepository.save(investmentEntity);
  
  return { message: "Investment is added"};

}


///score Submission
async scoreSubmission(idea_id: number,judge_id: number,submissionEntity : SubmissionEntity): Promise<{message:string}> {
  const idea = await this.ideaRepository.findOne({ where: { idea_id }, relations: ['submissionEntity']});
  const judge = await this.judgeRepository.findOne({ where: { judge_id }, relations: ['submissionEntitys'] });


  submissionEntity.ideaEntity=idea;
  submissionEntity.judgeEntitys= [judge];
 
  await this.submissionRepository.save(submissionEntity);
  return { message: "score is given"};
}


//remove score
async removeScore(submission_id: number, judge_id: number, idea_id: number): Promise<{ message: string }> {
  const submission = await this.submissionRepository.findOne({where: { submission_id },relations: ['judgeEntitys', 'ideaEntity'],});

  const judge = await this.judgeRepository.findOne({where: { judge_id },relations: ['submissionEntitys'],});

  const idea = await this.ideaRepository.findOne({ where: { idea_id }, relations: ['submissionEntity'],});

  judge.submissionEntitys = judge.submissionEntitys.filter(f => f.submission_id !== submission_id);
  await this.judgeRepository.save(judge);
  idea.submissionEntity = null;
  await this.ideaRepository.save(idea);
  await this.submissionRepository.remove(submission);

  return { message: "Score is deleted" };
}





}
