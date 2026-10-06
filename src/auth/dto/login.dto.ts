import { IsEmail, MaxLength, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail({}, { message: 'Correo inválido' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @MaxLength(120)
  email: string;

  @IsString()
  @MinLength(1, { message: 'La contraseña es obligatoria' })
  @MaxLength(72, { message: 'La contraseña debe tener máximo 72 caracteres' })
  password: string;
}
