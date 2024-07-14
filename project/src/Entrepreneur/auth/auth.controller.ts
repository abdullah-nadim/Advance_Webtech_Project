import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EntrepreneurLoginDTO } from '../entrepreneur.logindto';
import { EntrepreneurEntity } from '../entrepreneur.entity';

@Controller('entrepreneur')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() entrepreneur: EntrepreneurEntity) {
    return this.authService.signUp(entrepreneur);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInDto: EntrepreneurLoginDTO) {
    return this.authService.signIn(signInDto);
  }
}
