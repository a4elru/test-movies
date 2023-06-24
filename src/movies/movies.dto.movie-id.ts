import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class MovieIdDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;
}
