import { IsNotEmpty, IsString, IsIP, IsBoolean } from 'class-validator';

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

    @IsNotEmpty()
    @IsBoolean()
    public uploadRaw: boolean;
}
