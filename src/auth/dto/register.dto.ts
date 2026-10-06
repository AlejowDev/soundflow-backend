import { IsEmail, MaxLength, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Transform(({ value }) => value?.trim())
  @MaxLength(80)
  name: string;

  @IsEmail({}, { message: 'Correo inválido' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @MaxLength(120)
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
  @MaxLength(72, { message: 'La contraseña debe tener máximo 72 caracteres' })
  password: string;
}
