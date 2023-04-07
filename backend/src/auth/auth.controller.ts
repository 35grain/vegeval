import { Controller, Request, Get, Post, UseGuards, Body, Param, Query } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService, UserWithoutPassword } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from './public-route.decorator';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Public()
  @Post('register')
  async registerUser(
    @Body() CreateUserDto: RegisterUserDto
  ): Promise<UserWithoutPassword> {
    const hash = await this.authService.hashData(CreateUserDto.password);
    return this.usersService.createUser({
      email: CreateUserDto.username,
      password: hash,
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() AuthUserDto: AuthUserDto
  ) {
    return this.authService.login(AuthUserDto);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Query() query) {
    return this.authService.logout(Number(query.id));
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('token')
  async refreshTokens(@Query() query) {
    const userId = Number(query.id);
    const refreshToken = query.refresh_token;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
