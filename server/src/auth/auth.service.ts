import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.findByCond({ email });
      const comparedPassword = await bcrypt.compare(hashedPassword, user.password);
      if (user && comparedPassword) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      throw new HttpException('Неверный логин или пароль', HttpStatus.BAD_REQUEST);
    }
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.userService.create({ ...dto, password: hashedPassword });
      return {
        ...user,
        access_token: this.generateJwtToken(user),
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
