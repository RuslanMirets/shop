import { UserEntity } from './../entities/user.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Введите имя' })
  name: string;

  @IsEmail(undefined, { message: 'Некорректная почта' })
  @UniqueOnDatabase(UserEntity, { message: 'Пользователь с таким email уже существует' })
  email: string;

  @Length(6, 18, { message: 'Пароль должен быть минимум 6 и максимум 18 символов' })
  password: string;
}
