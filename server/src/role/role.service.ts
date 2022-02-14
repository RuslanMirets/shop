import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(RoleEntity) private repository: Repository<RoleEntity>) {}

  async create(dto: CreateRoleDto) {
    const role = await this.repository.save(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.repository.findOne({where: {value}});
    return role;
  }
}
