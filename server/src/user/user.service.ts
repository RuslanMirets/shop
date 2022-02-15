import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { from } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return from(this.repository.find({ relations: ['role'] }));
  }

  findById(id: number) {
    return this.repository.findOne(id);
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne(cond);
  }
}
