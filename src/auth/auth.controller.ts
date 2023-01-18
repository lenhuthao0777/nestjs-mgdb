import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLogin } from '@src/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthRegister } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() user: UserLogin) {
    return this.authService.login(user);
  }

  @Post('/register')
  create(@Body() register: AuthRegister) {
    return this.authService.register(register);
  }
}
