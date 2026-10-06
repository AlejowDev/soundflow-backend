import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional() @IsString() @MaxLength(80)
  name?: string;

  @IsOptional() @IsString() @MaxLength(120)
  headline?: string;

  @IsOptional() @IsString() @MaxLength(120)
  university?: string;

  @IsOptional() @IsString() @MaxLength(3000)
  studies?: string;

  @IsOptional() @IsString() @MaxLength(3000)
  experience?: string;
}
