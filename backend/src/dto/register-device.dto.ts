import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsIP, IsBoolean, IsNumber, Min, Max } from 'class-validator';

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
    @IsNumber()
    @Min(1024)
    @Max(65535)
    @Type(() => Number)
    public port: number;

    @IsNotEmpty()
    @IsBoolean()
    public uploadRaw: boolean;
}
