import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLogin } from './dto/login-user.dto';
import { hash, compare } from 'bcryptjs';
import { HandleResponse } from 'src/hooks/gobal.hook';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  /**
   * FindAll
   */
  public async findAll(): Promise<any> {
    const data = await this.userRepo.find();

    return HandleResponse(200, 'Get user success!', data);
  }

  public async register(user: RegisterUserDto): Promise<any> {
    const numSaltRounds = 10;

    const hashPass = await hash(user.password, numSaltRounds);

    const body: User = {
      name: user.name,
      email: user.email,
      password: hashPass,
      phone: user.phone,
      role: user.role,
    };

    const findAll: User[] = await this.findAll();

    const findUser = findAll.find((item) => item.email === user.email);

    if (findUser) {
      return HandleResponse(400, 'Email already exist');
    }

    const data: User = await this.userRepo.save(body);

    return HandleResponse(201, 'Register Success!', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    });
  }

  public async login(user: UserLogin): Promise<any> {
    const users: User[] = await this.userRepo.find();

    const findUser = users.find((item) => item.email === user.email);

    if (findUser) {
      const checkPassword = await compare(user.password, findUser.password);

      if (checkPassword) {
        return HandleResponse(201, 'Login success!', {
          name: findUser.name,
          email: findUser.email,
          phone: findUser.phone,
          role: findUser.role,
          token: 'this is token :))',
        });
      }

      return HandleResponse(400, 'Email or password is incorrect!');
    } else {
      return HandleResponse(400, 'Email or password is incorrect!');
    }
  }
}
