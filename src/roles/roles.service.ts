import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleResponse } from '@src/hooks/global.hook';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<any> {
    const data: Role = await this.roleRepo.save(createRoleDto);

    return HandleResponse(201, 'Create role success!', data);
  }

  async findAll() {
    const data = await this.roleRepo.find();
    return HandleResponse(200, 'Get Roles success!', data);
  }

  async findOne(id: string) {
    // const role = await this.roleRepo.findOne({
    //   where: {
    //     id: id,
    //   },
    // });
    // console.log(id);

    return id;
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
