import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { LoginDto } from 'src/auth/auth.dto.login';

export class CreateUserDto extends LoginDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  readonly username: string;
}
