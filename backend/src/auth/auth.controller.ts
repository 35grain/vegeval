import { Controller, Request, Get, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { NoJwt } from './decorators/no-jwt-route.decorator';
import { AuthUserDto } from '../dto/auth-user.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @NoJwt()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() AuthUserDto: AuthUserDto) {
    return this.authService.login(AuthUserDto);
  }

  @Get('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @NoJwt()
  @UseGuards(JwtRefreshGuard)
  @Get('token')
  async refreshTokens(@Request() req) {
    return this.authService.refreshTokens(req.user.id);
  }
}