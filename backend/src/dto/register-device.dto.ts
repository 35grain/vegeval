import { IsNotEmpty, IsString, IsNumber, IsIP } from 'class-validator';

export class RegisterDeviceDto {
    @IsNotEmpty()
    @IsString()
    public label: string;

    @IsNotEmpty()
    @IsString()
    public client: string;

    @IsNotEmpty()
    @IsString()
    public model: string;

    @IsNotEmpty()
    @IsIP()
    public ip: string;
}
