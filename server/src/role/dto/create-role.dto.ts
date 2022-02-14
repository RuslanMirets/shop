import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Введите значение' })
  value: string;

  @IsNotEmpty({ message: 'Введите описание' })
  description: string;
}
