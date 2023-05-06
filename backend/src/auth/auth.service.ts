import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  // Validate user credentials
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

  // Return user authentication tokens
  async login(data: AuthUserDto) {
    const user = await this.usersService.getUser({ email: data.username });
    const payload = { sub: user.id, email: user.email, role: user.role };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.updateUserRefreshToken({ id: userId }, null);
  }

  // Sign access token and refresh token
  async getTokens(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }),
      refresh_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '24h' }),
    }
  }

  // Generate new access token and refresh token
  async refreshTokens(userId: string) {
    const user = await this.usersService.getUserLogin({ id: userId });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const payload = { sub: user.id, email: user.email, role: user.role };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  // TODO: Move to utils
  // Hash data
  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  // Compare user password with hashed password
  async compareUserPassword(userId: string, password: string) {
    const user = await this.usersService.getUserLogin({ id: userId });
    return await bcrypt.compare(password, user.password);
  }

  // Update refresh token in database
  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUserRefreshToken({ id: userId }, hashedRefreshToken);
  }
}
