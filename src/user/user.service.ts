import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLogin } from './dto/login-user.dto';
import { hash, compare } from 'bcryptjs';
import { HandleResponse } from '@src/hooks/global.hook';
import { Role } from '@src/roles/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}
  /**
   * FindAll
   */
  public async findAll(): Promise<any> {
    const data: User[] = await this.userRepo.find();

    return HandleResponse(200, 'Get user success!', data);
  }

  public async register(user: RegisterUserDto): Promise<any> {
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
      return HandleResponse(400, 'Email already exist');
    }

    const data: User = await this.userRepo.save(body);

    return HandleResponse(201, 'Register Success!', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role_id: data.role_id,
    });
  }

  public async login(user: UserLogin): Promise<any> {
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

      if (checkPassword) {
        return HandleResponse(201, 'Login success!', {
          name: findUser.name,
          email: findUser.email,
          phone: findUser.phone,
          role_id: findUser.role_id,
          role: result.role_number,
          token: 'this is token :))',
          refresh_token: 'this is refresh token :))',
        });
      }

      return HandleResponse(400, 'Email or password is incorrect!');
    } else {
      return HandleResponse(400, 'Email or password is incorrect!');
    }
  }
}
