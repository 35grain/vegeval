import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class RegisterModelDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @Matches(/^[0-9]+\.[0-9]+\.[0-9]+$/)
    public version: string;

    @IsNotEmpty()
    @IsUrl()
    public url: string;
}
