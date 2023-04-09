import { IsNotEmpty, IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    public label: string;

    @IsNotEmpty()
    @IsNumber()
    public modelId: number;
}
