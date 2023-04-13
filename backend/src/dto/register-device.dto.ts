import { IsNotEmpty, IsString, IsNumber, IsIP } from 'class-validator';

export class RegisterDeviceDto {
    @IsNotEmpty()
    @IsString()
    public label: string;

    @IsNotEmpty()
    @IsNumber()
    public model: number;

    @IsNotEmpty()
    @IsIP()
    public ip: string;
}
