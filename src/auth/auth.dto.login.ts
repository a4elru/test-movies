import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  readonly password: string;
}
