import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { RefreshTokensDto } from './dto/refreshToken.dto';
import { Public } from './public.decarator';
import { HttpExceptionFilter } from './exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: SignupDto) {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @UseFilters(HttpExceptionFilter)
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokensDto) {
    return await this.authService.refresh(refreshTokenDto);
  }
}
