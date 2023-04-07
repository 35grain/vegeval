import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserLogin({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async login(data: AuthUserDto) {
    const user = await this.usersService.getUser({ email: data.username });
    const payload = { sub: user.id, email: user.email };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.updateRefreshToken(user.id, refreshToken);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken
    };
  }

  async logout(userId: number) {
    return this.usersService.updateUser({ id: userId }, { refreshToken: null });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getUserLogin({ id: userId });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.updateRefreshToken(user.id, newRefreshToken);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUser({ id: userId }, { refreshToken: hashedRefreshToken });
  }
}
