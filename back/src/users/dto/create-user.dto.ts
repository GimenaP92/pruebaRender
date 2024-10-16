import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsInt,
  Length,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';


export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;


  @IsNotEmpty()
  phone: string;

 
}