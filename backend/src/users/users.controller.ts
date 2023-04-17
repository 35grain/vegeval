import { Controller, Get, Param, Request, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService, UserWithoutPassword } from './users.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from 'src/dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
    ) { }

  @Roles(Role.Admin)
  @Get()
  async getUsers(@Param() params): Promise<UserWithoutPassword[]> {
    return this.usersService.getUsers(params);
  }

  @Get('profile')
  async getProfile(@Request() req): Promise<UserWithoutPassword> {
    return this.usersService.getUser({ id: req.user.id });
  }

  @Roles(Role.Admin)
  @Post('register')
  async registerUser(@Body() user: RegisterUserDto): Promise<UserWithoutPassword> {
    return this.usersService.createUser(user);
  }

  @Post('update')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<UserWithoutPassword> {
    if (updateUserDto.password && updateUserDto.password !== updateUserDto.passwordConfirm) {
      throw new BadRequestException('Passwords do not match!');
    } else {
      delete updateUserDto.passwordConfirm;
      updateUserDto.password = await this.authService.hashData(updateUserDto.password);
    }
    return this.usersService.updateUser({ id: req.user.id}, updateUserDto);
  }
}
