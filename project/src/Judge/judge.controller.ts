import  { Controller, Get, Param, Query, Body, Put, Post, Patch, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, ParseIntPipe, Session, UseGuards, NotFoundException, InternalServerErrorException, HttpStatus, HttpException } from "@nestjs/common";
import { JudgeService } from "./judge.service";
import { JudgeDTO } from "./judge.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { JudgeEntity } from "./judge.entity";
// import { EntrepreneurEntity } from "src/Entrepreneur/entrepreneur.entity";
import { SubmissionEntity } from "./submission.entity"; 
import { MailService } from "./mail.service";
import { JudgeLoginDTO } from "./judge.logindto";
import { SessionGuard } from "./judge.guard";
import session from "express-session";
import { AuthGuard } from "./auth/auth.guard";
import { JudgeProfile } from "./judge.profile";
import { FeedbackEntity } from "./feedback.entity";
import { PresentationEntity } from "./presentation.entity";
import { InvestmentEntity } from "./investment.entity";
import { NotificationEntity } from "./notification.entity";
import { IdeaEntity } from "./idea.entity";




@Controller('judge')
  export class JudgeController {
    constructor(
      private readonly judgeService: JudgeService,
      private readonly mailerService: MailService, 
    ) {}


// @Get('get/:id')
// getJudgebyId(@Param('id') id: number): object {
//     return this.judgeService.getJudgebyId(id);
//   }

//   @Get('getbynameandid')
//   getJudgebyNameAndId(@Query('name') name: string, @Query('id') id: number): object {
//       return this.judgeService.getJudgebyNameAndId(name, id);
//     }

//   @Get('getjudge')
//   getJudge(@Body() myobj:object): object {
//       return this.judgeService.getJudge(myobj);
//     }
  

//     // @Post('addjudge')
//     // addJudge(@Body() myobj:object): object {
//     //     return this.judgeService.getJudge(myobj);
//     //   }

//     // @Put('updatejudge/:id')
//     // updateJudge(@Body() myobj:object, @Param('id') id:number): object {
//     //     return this.judgeService.updateJudge(myobj,id);
//     //   }

//       @Patch('searchjudge/:name')
//     searchJudge(@Body() myobj:object, @Param('name') name:string): object {
//         return this.judgeService.searchJudge(myobj,name);
//       }

//     //   @Delete('searchjudge/:name')
//     // deleteJudge(@Param('name') name:string, @Query() myobj: object): object {
//     //     return this.judgeService.deleteJudge(myobj,name);
//     //   }

//       @Post('validjudge')
//       @UsePipes(new ValidationPipe())
//       validJudge(@Body() myobj:JudgeDTO): object {
//           return this.judgeService.getJudge(myobj);
//         }

//           @Post('addpdf')
//           @UseInterceptors(FileInterceptor('myfile',
//             { fileFilter: (req, file, cb) => {
//               if (file.originalname.match(/^.*\.(pdf)$/))
//               cb(null, true);
//               else {
//               cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
//               }
//               },
//               limits: {  fileSize: 5 * 1024 * 1024  },
//               storage:diskStorage({
//               destination: './uploads',
//               filename: function (req, file, cb) {
//               cb(null,Date.now()+file.originalname)
//               },
//               })
//               }))
//           addPDF(@UploadedFile() file: Express.Multer.File) 
//           {
//           console.log(file);
//           }

//           @Get('/getpdf/:name')
//           getPDF(@Param('name') name, @Res() res) {
//           res.sendFile(name,{ root: './uploads' })
//           }

//           @Post('createjudge')
//           async createJudge(@Body() judgeEntity: JudgeEntity): Promise<JudgeEntity> {
//           return this.judgeService.createJudge(judgeEntity);
//           }

//           @Get('getalljudge')
//           @UseGuards(AuthGuard)
//           getAllJudges(): Promise<JudgeEntity[]> {
//             return this.judgeService.getAllJudges();
//           }

//           @Get('getjudgebyid/:id')
//           getJudgeById(@Param('id') id: number): Promise<JudgeEntity> {
//             return this.judgeService.getJudgeById(id);
//           }

//           @Put('updatejudge/:id')
//   updateJudge(@Param('id') id: number,@Body() updatedJudge: JudgeEntity): Promise<JudgeEntity> {
//     return this.judgeService.updateJudge(id, updatedJudge);
//   }

//   @Delete('deletejudge/:id')
//   async deleteJudge(@Param('id') id: number): Promise<void> {
//     await this.judgeService.deleteJudge(id);
//   }


//   @Get('selectedfields')
//   getEntityWithSelectedFields(): Promise<Partial<JudgeEntity>[]> {
//     return this.judgeService.getEntityWithSelectedFields();
//   }

//   @Get('selectedwithor')
//   getEntityWithor(): Promise<Partial<JudgeEntity>[]> {
//     return this.judgeService.getEntityWithor();
//   }

//   @Get('selectedwithand')
//   getEntityWithand(): Promise<Partial<JudgeEntity>[]> {
//     return this.judgeService.getEntityWithand();
//   }

//   @Get('selectedwithorder')
//   getEntityWithorder(): Promise<Partial<JudgeEntity>[]> {
//     return this.judgeService.getEntityWithorder();
//   }

//   @Get('selectedwithlike')
//   getEntityWithlike(): Promise<Partial<JudgeEntity>[]> {
//     return this.judgeService.getEntityWithlike();
//   }



//   ///create entrepreneur
//   @Post('createentrepreneur')
//   createEnrepreneur(@Body() entrepreneurEntity: EntrepreneurEntity): Promise<EntrepreneurEntity> {
//           return this.judgeService.createEnrepreneur(entrepreneurEntity);
//           }


//           @Get('getallentrepreneur')
//           @UseGuards(AuthGuard)
//           getAllEntrepreneur(): Promise<EntrepreneurEntity[]> {
//             return this.judgeService.getAllEntrepreneur();
//           }

//           @Post('createsubmission/:enrepreneurid')
//           createSubmission(@Param('enrepreneurid') enrepreneurid, @Body() submissionEntity: SubmissionEntity): Promise<SubmissionEntity> {
//           return this.judgeService.createSubmission(enrepreneurid, submissionEntity);
//           }

//           @Post('createreview/:judgeId/:submissionId')
//   createReview(@Param('judgeId') judgeId ,@Param('submissionId') submissionId ,@Body() reviewEntity: ReviewEntity): Promise<ReviewEntity> {
//     return this.judgeService.createReview(judgeId, submissionId, reviewEntity);
//   }

            

// @Post('send-code')
// @UsePipes(new ValidationPipe())
// async sendResetCode(@Body() sendResetCodeDto: SendResetCodeDto): Promise<void> {
//   sendResetCodeDto.code = Math.floor(Math.random() * 1000); 
//   await this.mailerService.sendResetCode(sendResetCodeDto);
// }


    

///////**********session

@Post('addsessionjudge')
@UsePipes(new ValidationPipe())
createsessionJudge(@Body() myobj:JudgeEntity): object 
{
  return this.judgeService.createsessionJudge(myobj);
}


@Post('sessionlogin')
async sessionlogin(@Body() myobj:JudgeLoginDTO, @Session() session): Promise<any> {
const res= await this.judgeService.sessionlogin(myobj);
if(res==true)
  {
    session.email=myobj.email;
  }
return this.judgeService.sessionlogin(myobj);
}

////////*******jwt

///go to judge profile
@Get('getJudgeProfileByJudgeId/:judge_id')
  @UseGuards(AuthGuard)
  async getJudgeProfile(@Param('judge_id') judge_id: number): Promise<JudgeProfile> {
    try {
      const judgeProfile = await this.judgeService.getJudgeProfile(judge_id);
      if (!judgeProfile) {
        throw new NotFoundException('Judge profile with ID'+judge_id+'not found');
      }
      return judgeProfile;
    } catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }



//check notification
@Get('getnotification/:judge_id')
  @UseGuards(AuthGuard)
  async checkNotificationsByJudge(@Param('judge_id') judge_id: number): Promise<NotificationEntity[]> {
    try {
      const notifications = await this.judgeService.checkNotificationsByJudge(judge_id);
      if (!notifications || notifications.length === 0) {
        throw new NotFoundException('No notifications found for judge with'+judge_id);
      }
      return notifications;
    } catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }


///update  judge profile
@Put('updatejudge/:judge_profile_id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateJudge(@Param('judge_profile_id') judge_profile_id: number, @Body() updatedProfile: JudgeProfile): Promise<JudgeProfile> {
    try {
      const updatedJudgeProfile = await this.judgeService.updateJudge(judge_profile_id, updatedProfile);
      if (!updatedJudgeProfile) {
        throw new NotFoundException('Judge profile with ID'+judge_profile_id+'not found');
      }
      return updatedJudgeProfile;
    } catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }

///add collaborator
@Post('addcollaborator/:judge_profile_id/:judge_collaborator_id')
  async addCollaborator(@Param('judge_profile_id', ParseIntPipe) judge_profile_id: number,@Param('judge_collaborator_id', ParseIntPipe) judge_collaborator_id: number,) {
    try {
      const result = await this.judgeService.addCollaborator(judge_profile_id, judge_collaborator_id);
      if (!result) {
        throw new NotFoundException('Unable to add collaborator: Collaborator with ID'+judge_collaborator_id+'or Judge with ID'+judge_profile_id+'not found');
      }
      return result;
    } catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }

  ///idea
  @Post('idea')
  @UsePipes(new ValidationPipe())
  async createIdea(@Body() ideaEntity: IdeaEntity): Promise<IdeaEntity> {
    try {
      return await this.judgeService.createIdea(ideaEntity);
    } catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }


///give feedback
@Post('givefeedback/:judge_id/:idea_id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async giveFeedback(@Param('judge_id') judge_id: number,@Param('idea_id') idea_id: number,@Body() feedbackEntity: FeedbackEntity,) {
    try {
      return await this.judgeService.giveFeedback(judge_id, idea_id, feedbackEntity);
    } catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }



///delete feedback
@Delete('removeFeedbackFromJudge/:judge_id/:idea_id/:feedback_id')
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
async deleteFeedback(@Param('feedback_id') feedback_id: number,@Param('judge_id') judge_id: number,@Param('idea_id') idea_id: number,) {
  try {
    return await this.judgeService.deleteFeedback(feedback_id, judge_id, idea_id);
  } catch (error) { 
    throw new HttpException(error, HttpStatus.FORBIDDEN); 
     }
}




///give rating
@Post('giverating/:judge_id/:idea_id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async addRatePresentationToJudge(@Param('judge_id') judge_id: number,@Param('idea_id') idea_id: number,@Body() presentationEntity: PresentationEntity,) {
    try {
      return await this.judgeService.addRatePresentationToJudge(judge_id, idea_id, presentationEntity);
    } catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }


///delete rating
  @Delete('removeratePresentationFromJudge/:judge_id/:idea_id/:presentation_id')
  @UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
  async removeRatePresentationFromJudge(@Param('presentation_id', ParseIntPipe) presentation_id: number,@Param('judge_id', ParseIntPipe) judge_id: number,@Param('idea_id', ParseIntPipe) idea_id: number) {
    try{
    return this.judgeService.removeRatePresentationFromJudge(presentation_id, judge_id,idea_id);
  }
  catch (error) { 
    throw new HttpException(error, HttpStatus.FORBIDDEN); 
     }
}

///give invest
/////mailer
  @Post('giveinvest/:judge_id/:idea_id/:judge_email/:idea_title')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  giveInvesmentToJudge(@Param('idea_title') idea_title: string,@Param('judge_email') judge_email: string,@Param('judge_id', ParseIntPipe) judge_id: number,@Param('idea_id', ParseIntPipe) idea_id: number,@Body() investmentEntity: InvestmentEntity) {
    try{ 
    this.mailerService.sendResetCode(judge_email,idea_title );      
    return this.judgeService.giveInvesmentToJudge(judge_id,idea_id,investmentEntity);
          
    }
    catch (error) { 
      throw new HttpException(error, HttpStatus.FORBIDDEN); 
       }
  }

///score Submission
  @Post('givescore/:judge_id/:idea_id')
  @UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
  scoreSubmission(@Param('judge_id') judge_id ,@Param('idea_id') idea_id:number,@Body() submissionEntity: SubmissionEntity) {
    try{
    return this.judgeService.scoreSubmission(judge_id,idea_id,submissionEntity);
  }catch (error) { 
    throw new HttpException(error, HttpStatus.FORBIDDEN); 
     }
}


///delete score
@Delete('removescore/:judge_id/:idea_id/:submission_id')
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
async removeScore( @Param('judge_id', ParseIntPipe) judge_id: number,@Param('idea_id', ParseIntPipe) idea_id: number,@Param('submission_id', ParseIntPipe) submission_id: number) {
  try{
  return this.judgeService.removeScore(submission_id, judge_id, idea_id);
}catch (error) { 
  throw new HttpException(error, HttpStatus.FORBIDDEN); 
   }
}





  //get prototype
  @Post('prototype')
            @UseInterceptors(FileInterceptor('myfile',
              { fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(pdf)$/))
                cb(null, true);
                else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
                }
                },
                limits: {  fileSize: 5 * 1024 * 1024  },
                storage:diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
                },
                })
                }))
            addPrototype(@UploadedFile() file: Express.Multer.File) 
            {
              try{
              return { message: "File uploaded"};
            console.log(file);
            }catch (error) { 
              throw new HttpException(error, HttpStatus.FORBIDDEN); 
               }
            }
  
            @Get('/getprototype/:name')
            @UseGuards(AuthGuard)
            getPrototype(@Param('name') name, @Res() res) {
              try{
            res.sendFile(name,{ root: './uploads' })

            }catch (error) { 
              throw new HttpException(error, HttpStatus.FORBIDDEN); 
               }
            }
  




  }









