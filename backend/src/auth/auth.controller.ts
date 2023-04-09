import { Controller, Request, Get, Post, UseGuards, Body, Param, Query } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService, UserWithoutPassword } from 'src/users/users.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { Public } from './public-route.decorator';
import { AuthUserDto } from '../dto/auth-user.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Public()
  @Post('register')
  async registerUser(@Body() user: RegisterUserDto): Promise<UserWithoutPassword> {
    return this.usersService.createUser(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() AuthUserDto: AuthUserDto) {
    return this.authService.login(AuthUserDto);
  }

  @Get('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('token')
  async refreshTokens(@Request() req) {
    return this.authService.refreshTokens(req.user.id);
  }
}
