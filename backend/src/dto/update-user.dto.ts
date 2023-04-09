import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  public username: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  public password: string;

  @IsOptional()
  @IsString()
  public passwordConfirm: string;
}
