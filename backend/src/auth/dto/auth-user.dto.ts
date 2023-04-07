import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
