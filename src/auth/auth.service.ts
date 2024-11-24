import { ForbiddenException, Injectable } from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { RefreshTokensDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(signUpDto: SignupDto) {
    const { login, password } = signUpDto;
    await this.usersService.create({
      login,
      password,
    });
    return `signup ${login}`;
  }

  async login(loginDto: SignupDto) {
    const { login } = loginDto;
    const isValid = await this.usersService.validateUser(loginDto);
    if (!isValid) {
      throw new ForbiddenException('Wrong login or password');
    }
    return `login ${login}`;
  }

  async refresh(refreshTokensDto: RefreshTokensDto) {
    // todo
    return refreshTokensDto;
  }
}
