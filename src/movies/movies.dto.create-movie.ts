import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateMovieRawDto } from './movies.dto.create-movie-raw';

export class CreateMovieDto extends CreateMovieRawDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  readonly creatorUserId: string;

  constructor(createMovieRawDto: CreateMovieRawDto, creatorUserId: string) {
    super(createMovieRawDto);
    this.creatorUserId = creatorUserId;
  }
}
