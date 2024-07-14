import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JudgeService } from '../judge.service'; 
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { JudgeLoginDTO } from '../judge.logindto';
import { JudgeEntity } from '../judge.entity';
import { JudgeProfile } from '../judge.profile';
import { NotificationEntity } from '../notification.entity';

@Injectable()
export class AuthService {
  constructor(
    private judgeService: JudgeService,
    private jwtService: JwtService
  ) {}


  async signUp(judgeEntity: JudgeEntity, judgeProfile: JudgeProfile): Promise<{ message: string }> {
    try {
    
      judgeProfile.judge_profile_password = judgeEntity.judge_password;
      judgeProfile.judgeEntity = judgeEntity;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(judgeEntity.judge_password, salt);
      judgeEntity.judge_password = hashedPassword;
  
      await this.judgeService.createAuthJudge(judgeEntity, judgeProfile);
  
      return {
        message: "Judge is added successfully"
      };
    } catch (error) {
      throw new Error('Failed to sign up judge:'+error.message);
    }
  }


  async signIn(signInDto: JudgeLoginDTO): Promise<{ access_token: string }> {
    try {
      const judge = await this.judgeService.findOne(signInDto.email);
      if (!judge || !(await bcrypt.compare(signInDto.password, judge.judge_password))) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const payload = { email: signInDto.email };  
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
        throw error;
      
    }
  }
}