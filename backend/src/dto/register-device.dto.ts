import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RegisterDeviceDto {
    @IsNotEmpty()
    @IsString()
    public label: string;

    @IsNotEmpty()
    @IsNumber()
    public modelId: number;
}
