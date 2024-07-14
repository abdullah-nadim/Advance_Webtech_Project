import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Put,
  Post,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseIntPipe,
  Session,
  UseGuards,
} from '@nestjs/common';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurDTO } from './entrepreneur.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { EntrepreneurEntity } from './entrepreneur.entity';
import { MailService } from './mail.service';
import { SendResetCodeDto } from './send-reset-code.dto';
import { EntrepreneurLoginDTO } from './entrepreneur.logindto';
import { SessionGuard } from './entrepreneur.guard';
import session from 'express-session';
import { AuthGuard } from './auth/auth.guard';
import { IdeaEntity } from './idea.entity';
import { NotificationService } from './notification.service';
import { PrototypeEntity } from './prototype.entity';
import { PresentationEntity } from './presentation.entity';

@Controller('entrepreneur')
export class EntrepreneurController {
  constructor(
    private readonly entrepreneurService: EntrepreneurService,
    private readonly mailerService: MailService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get('get/:id')
  @UseGuards(AuthGuard)
  getJudgebyId(@Param('id') id: number): object {
    return this.entrepreneurService.getById(id);
  }

  @Post('uploadprototype')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(pdf|pptx)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf or pptx'), false);
        }
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  uploadPrototype(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/getprototype/:name')
  @UseGuards(AuthGuard)
  getPDF(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }

  @Delete('deletejudge/:id')
  @UseGuards(AuthGuard)
  async deleteJudge(@Param('id') id: number): Promise<void> {
    await this.entrepreneurService.deleteEntrepreneur(id);
  }

  @Post('prototype/:pid')
  async prototype(
    @Param('pid') pid: number,
    @Body() prototype: PrototypeEntity,
  ): Promise<any> {
    return this.entrepreneurService.prototypeInfo(pid, prototype);
    //return this.notificationService.createNotification("Prototype Information uploaded!");
  }

  @Post('sendcode')
  @UsePipes(new ValidationPipe())
  async sendResetCode(
    @Body() sendResetCodeDto: SendResetCodeDto,
  ): Promise<void> {
    sendResetCodeDto.code = Math.floor(Math.random() * 1000);
    await this.mailerService.sendResetCode(sendResetCodeDto);
  }

  @Post('presentations/:pid')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async givePresentations(
    @Param('pid') pid: number,
    @Body() presentationEntity: PresentationEntity,
  ): Promise<any> {
    return this.entrepreneurService.submitPresentation(pid, presentationEntity);
  }

  @Put('update/:eid')
  @UseGuards(AuthGuard)
  updateEntrepreneur(
    @Param('eid') eid: number,
    @Body() updatedEntrepreneur: EntrepreneurEntity,
  ): Promise<EntrepreneurEntity> {
    return this.entrepreneurService.updateEntrepreneur(
      eid,
      updatedEntrepreneur,
    );
  }

  @Put('updateidea/:id')
  @UseGuards(AuthGuard)
  updateIdea(
    @Param('id') id: number,
    @Body() updatedIdea: IdeaEntity,
  ): Promise<IdeaEntity> {
    return this.entrepreneurService.updateIdea(id, updatedIdea);
  }

  @Get('allnotification')
  @UseGuards(AuthGuard)
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Get('ideastatus/:id')
  async getSubmissionStatus(@Param('id') id: string) {
    const ideaId = parseInt(id, 10); // Parse the ID from string to number

    return this.entrepreneurService.getSubmissionStatus(ideaId);
  }

  @Post('submission/:eid')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async signUp(@Param('eid') eid: number, @Body() idea: IdeaEntity) {
    return this.entrepreneurService.submitIdea(eid, idea);
  }

  @Get('faq')
  async getAllFAQ() {
    return this.entrepreneurService.getAllFAQ();
  }
  @Get('feedback')
  async getfeedback() {
    return this.entrepreneurService.getAllFeedback();
  }
}
