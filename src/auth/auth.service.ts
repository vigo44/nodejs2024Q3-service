import { ForbiddenException, Injectable } from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { RefreshTokensDto } from './dto/refreshToken.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async signup(signUpDto: SignupDto) {
    const { login, password } = signUpDto;
    const { id } = await this.usersService.create({
      login,
      password,
    });
    return { id };
  }

  async login(loginDto: SignupDto) {
    const user = await this.usersService.findUserByLogin(loginDto);
    if (!user) {
      throw new ForbiddenException('Wrong login or password');
    }
    const accessToken = await this.createAccessToken(user.id, user.login);
    const refreshToken = await this.createRefreshToken(user.id, user.login);
    return { accessToken, refreshToken };
  }

  async refresh(refreshTokensDto: RefreshTokensDto) {
    const { refreshToken } = refreshTokensDto;
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const accessToken = await this.createAccessToken(
        payload.userId,
        payload.login,
      );
      const newRefreshToken = await this.createRefreshToken(
        payload.userId,
        payload.login,
      );

      return { accessToken, refreshToken: newRefreshToken };
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private async createAccessToken(userId: string, login: string) {
    return this.jwtService.signAsync(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
  }

  private async createRefreshToken(userId: string, login: string) {
    return this.jwtService.signAsync(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
  }
}
