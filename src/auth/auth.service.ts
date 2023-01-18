import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleResponse } from '@src/hooks/global.hook';
import { Role } from '@src/roles/entities/role.entity';
import { User } from '@src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { AuthLogin } from './dto/auth-login.dto';
import { AuthRegister } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  // Login
  async login(user: AuthLogin): Promise<any> {
    const users: User[] = await this.userRepo.find();

    const findUser: User = users.find((item) => item.email === user.email);

    if (findUser) {
      const checkPassword: boolean = await compare(
        user.password,
        findUser.password,
      );

      const role: Role[] = await this.roleRepo.find();

      const result: Role = role.find(
        (item) => String(item._id) === findUser.role_id,
      );

      const jwt = await this.jwtService.signAsync({
        name: findUser.name,
        email: findUser.email,
        phone: findUser.phone,
        role: result.role_number,
      });

      if (checkPassword) {
        return HandleResponse(HttpStatus.OK, 'Login success!', {
          name: findUser.name,
          email: findUser.email,
          phone: findUser.phone,
          role_id: findUser.role_id,
          role: result.role_number,
          token: jwt,
          refresh_token: 'this is refresh token :))',
        });
      }

      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        'Email or password is incorrect!',
      );
    } else {
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        'Email or password is incorrect!',
      );
    }
  }

  // Register
  async register(user: AuthRegister): Promise<any> {
    const numSaltRounds = 10;

    const hashPass: string = await hash(user.password, numSaltRounds);

    const body: User = {
      name: user.name,
      email: user.email,
      password: hashPass,
      phone: user.phone,
      role_id: user.role_id,
      create_at: user.create_at,
      update_at: user.update_at,
    };

    const findAll: User[] = await this.userRepo.find();

    const findUser: User = findAll.find((item) => item.email === user.email);

    if (findUser) {
      return HandleResponse(HttpStatus.BAD_REQUEST, 'Email already exist');
    }

    const data: User = await this.userRepo.save(body);

    return HandleResponse(HttpStatus.OK, 'Register Success!', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role_id: data.role_id,
    });
  }
}
