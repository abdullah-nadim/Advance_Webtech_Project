import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendResetCodeDto {
  @IsEmail()
  email: string;

  code: number;

  

  
}