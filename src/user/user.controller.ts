import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserLogin } from './dto/login-user.dto';
import { JwtGuards } from '@src/auth/guards/jwt.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuards)
  @Get(':id')
  findOne(@Param('id') name: string) {
    return this.userService.getUserById(name);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
