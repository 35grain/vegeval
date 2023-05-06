import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  public password: string;

  @IsOptional()
  @IsString()
  @MinLength(16)
  public newPassword: string;

  @IsOptional()
  @IsString()
  @MinLength(16)
  public newPasswordConfirm: string;
}
