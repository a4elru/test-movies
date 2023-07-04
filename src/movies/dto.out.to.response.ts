import { HttpStatus } from '@nestjs/common';
import {
  ImageIdRCdto,
  MovieIdRCdto,
} from './dto.1.from.request';
import { ApiProperty } from '@nestjs/swagger';
import { MovieResponse } from './dto.response.movie';
import { MovieDocument } from './movie';
import { ImageResponse } from 'src/_images/dto.response.image';
import { ImageDocument } from 'src/_images/image';

export interface IResponseCRdto {
  message: string;
  result?: MovieResponse | MovieResponse[] | ImageResponse | ImageResponse[];
  statusCode: number;
}

// Successful responses

export class CreateMovieCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Movie has been created successfully' })
  readonly message: string = 'Movie has been created successfully';
  @ApiProperty({ default: HttpStatus.CREATED })
  readonly statusCode: number = HttpStatus.CREATED;
  @ApiProperty({ type: MovieResponse })
  readonly result: MovieResponse;

  constructor(movie: MovieDocument) {
    this.result = new MovieResponse(movie);
  }
}

export class GetAllMoviesCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'All movies data found successfully' })
  readonly message: string = 'All movies data found successfully';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: MovieResponse, isArray: true })
  readonly result: MovieResponse[];

  constructor(movies: MovieDocument[]) {
    this.result = movies.map((movie) => {
      return new MovieResponse(movie);
    });
  }
}

export class GetMovieCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Movie found successfully' })
  readonly message: string = 'Movie found successfully';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: MovieResponse })
  readonly result: MovieResponse;

  constructor(movie: MovieDocument) {
    this.result = new MovieResponse(movie);
  }
}

export class UpdateMovieCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Movie has been successfully updated' })
  readonly message: string = 'Movie has been successfully updated';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: MovieResponse })
  readonly result: MovieResponse;

  constructor(movie: MovieDocument) {
    this.result = new MovieResponse(movie);
  }
}

export class DeleteMovieCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Movie deleted successfully' })
  readonly message: string = 'Movie deleted successfully';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: MovieResponse })
  readonly result: MovieResponse;

  constructor(movie: MovieDocument) {
    this.result = new MovieResponse(movie);
  }
}

export class GetImageCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Image found successfully' })
  readonly message: string = 'Image found successfully';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: ImageResponse })
  readonly result: ImageResponse;

  constructor(movie: ImageDocument) {
    this.result = new ImageResponse(movie);
  }
}

export class GetAllImagesCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'All images data found successfully' })
  readonly message: string = 'All images data found successfully';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: ImageResponse, isArray: true })
  readonly result: ImageResponse[];

  constructor(images: ImageDocument[]) {
    this.result = images.map((image) => {
      return new ImageResponse(image);
    });
  }
}

export class DeleteImageCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Image deleted successfully' })
  readonly message: string = 'Image deleted successfully';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: ImageResponse })
  readonly result: ImageResponse;

  constructor(image: ImageDocument) {
    this.result = new ImageResponse(image);
  }
}

export class AddImageForMovieCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Image added successfully' })
  readonly message: string = 'Image added successfully';
  @ApiProperty({ default: HttpStatus.CREATED })
  readonly statusCode: number = HttpStatus.CREATED;
  @ApiProperty({ type: ImageResponse })
  readonly result: ImageResponse;

  constructor(image: ImageDocument) {
    this.result = new ImageResponse(image);
  }
}

// Exceptions

export class NotFoundMovieExceptionCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Movie #${id} not found' })
  readonly message: string = 'Movie #${id} not found';
  @ApiProperty({ default: HttpStatus.NOT_FOUND })
  readonly statusCode: number = HttpStatus.NOT_FOUND;

  constructor(movieIdRCdto: MovieIdRCdto) {
    this.message = `Movie #${movieIdRCdto.movieId} not found`;
  }
}

export class NotFoundImageExceptionCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Image #${id} not found' })
  readonly message: string = 'Image #${id} not found';
  @ApiProperty({ default: HttpStatus.NOT_FOUND })
  readonly statusCode: number = HttpStatus.NOT_FOUND;

  constructor(imageIdRCdto: ImageIdRCdto) {
    this.message = `Image #${imageIdRCdto.imageId} not found`;
  }
}

export class ForbiddenExceptionCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Access to movie #${id} is forbidden' })
  readonly message: string = 'Access to movie #${id} is forbidden';
  @ApiProperty({ default: HttpStatus.FORBIDDEN })
  readonly statusCode: number = HttpStatus.FORBIDDEN;

  constructor(movieIdRCdto: MovieIdRCdto) {
    this.message = `Access to movie #${movieIdRCdto.movieId} is forbidden`;
  }
}
