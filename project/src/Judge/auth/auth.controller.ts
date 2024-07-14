import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JudgeLoginDTO } from '../judge.logindto';
import { JudgeEntity } from '../judge.entity';
import * as bcrypt from "bcrypt";
import { JudgeProfile } from '../judge.profile';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}



  @Post('addauthjudge')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() judgeEntity: JudgeEntity, @Body() judgeProfile: JudgeProfile) {
    try {
      return await this.authService.signUp(judgeEntity, judgeProfile);
    } catch (error) {
      throw new BadRequestException('Error occurred while signing up');
    }
  }


@Post('login')
@UsePipes(new ValidationPipe())
  signIn(@Body() signInDto: JudgeLoginDTO) {
    return this.authService.signIn(signInDto);
  }

}