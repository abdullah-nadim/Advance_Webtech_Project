import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, Matches, MinLength, Contains } from "class-validator";

export class JudgeDTO
{
    @IsNotEmpty()
    @Matches(/^[A-Za-z]+$/, { message: "Please enter a A-Z or a-z with no space, no special character is allowed" })
    name: string;

    @IsNotEmpty()
    @MinLength(6, { message: "Name must be at least 6 characters long" })
    @Matches(/[a-z]/,{ message: "Password must contain at least one lowercase letter" })
    password: string;

    @IsNotEmpty()
    @Matches(/^01[0-9]+$/,{ message: "Phone number must start with 01" })
    phone_number: string;

    
}