import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
