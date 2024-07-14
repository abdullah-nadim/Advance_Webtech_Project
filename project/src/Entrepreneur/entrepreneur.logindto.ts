import { IsEmail, IsNotEmpty } from "class-validator";

export class EntrepreneurLoginDTO
{
   // @IsEmail()
    email: string;

    @IsNotEmpty()
  password: string;


}