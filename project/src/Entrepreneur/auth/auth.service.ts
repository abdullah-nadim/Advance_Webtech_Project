import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntrepreneurService } from '../entrepreneur.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EntrepreneurLoginDTO } from '../entrepreneur.logindto';
import { EntrepreneurEntity } from '../entrepreneur.entity';


@Injectable()
export class AuthService {
  constructor(
    private judgeService: EntrepreneurService,
    private jwtService: JwtService,
  ) {}

  // async signUp(entrepreneurEntity: EntrepreneurEntity): Promise<EntrepreneurEntity> {
  //   console.log('signUp input:', entrepreneurEntity);
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(entrepreneurEntity.password, salt);
  //   entrepreneurEntity.password = hashedPassword;
  //   return this.judgeService.createAuthJudge(entrepreneurEntity);
  // }

  async signUp(
    entrepreneurEntity: EntrepreneurEntity,
  ): Promise<EntrepreneurEntity> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(entrepreneurEntity.password, salt);
    entrepreneurEntity.password = hashedPassword;
    return this.judgeService.createAuthJudge(entrepreneurEntity);
  }

  async signIn(
    signInDto: EntrepreneurLoginDTO,
  ): Promise<{ access_token: string }> {
    const entrepreneur = await this.judgeService.findOne(signInDto.email);
    if (
      !entrepreneur ||
      !(await bcrypt.compare(signInDto.password, entrepreneur.password))
    ) {
      throw new UnauthorizedException();
    }
    const payload = signInDto;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
