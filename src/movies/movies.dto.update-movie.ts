import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './movies.dto.create-movie';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
