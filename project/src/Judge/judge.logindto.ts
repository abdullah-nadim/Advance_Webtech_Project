import { IsEmail, IsNotEmpty } from "class-validator";

export class JudgeLoginDTO
{
  @IsNotEmpty()
  @IsEmail()
    email: string;

    @IsNotEmpty()
  password: string;


}