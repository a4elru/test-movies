import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  readonly description: string;
}
