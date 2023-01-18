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
  async findAll(): Promise<any> {
    const data: User[] = await this.userRepo.find();

    return HandleResponse(200, 'Get user success!', data);
  }

  async getUserById(name: any): Promise<any> {
    const data = await this.userRepo.findOne({
      where: { name },
    });

    console.log(data);

    return data;
  }
}
