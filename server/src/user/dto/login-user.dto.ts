import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Некорректная почта' })
  email: string;

  @Length(6, 18, { message: 'Пароль должен быть минимум 6 и максимум 18 символов' })
  password: string;
}
