import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { MovieIdDto } from './movies.dto.movie-id';
import { CreateMovieDto } from './movies.dto.create-movie';
import { CreateMovieRawDto } from './movies.dto.create-movie-raw';
import { UpdateMovieDto } from './movies.dto.update-movie';
import { MovieService } from './movies.service';
import { ResMovie } from './movies.response.class';
import { Response } from 'express';
import { RequestWithUser } from 'src/auth/auth.request-with-user';
import { Public } from 'src/auth/auth.decorator.public-route';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Body() createMovieRawDto: CreateMovieRawDto,
  ) {
    const createMovieDto = new CreateMovieDto(
      createMovieRawDto,
      request.user.sub,
    );
    const newMovie = await this.movieService.createMovie(createMovieDto);
    return response.status(HttpStatus.CREATED).json({
      message: 'Movie has been created successfully',
      result: new ResMovie(newMovie),
      statusCode: HttpStatus.CREATED,
    });
  }

  @Put('/:id')
  async updateMovie(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Param() movieIdDto: MovieIdDto,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const existingMovie = await this.movieService.getMovie(movieIdDto);
    if (!existingMovie) {
      throw new NotFoundException(
        MovieController.NotFoundMessage(movieIdDto.id),
      );
    }
    if (existingMovie.creatorUserId.toString() !== request.user.sub) {
      throw new ForbiddenException();
    }
    const updatedMovie = await this.movieService.updateMovie(
      movieIdDto,
      updateMovieDto,
    );
    return response.status(HttpStatus.OK).json({
      message: 'Movie has been successfully updated',
      result: new ResMovie(updatedMovie),
      statusCode: HttpStatus.OK,
    });
  }

  @Public()
  @Get()
  async getAllMovies(@Res() response: Response) {
    const allMovies = await this.movieService.getAllMovies();
    return response.status(HttpStatus.OK).json({
      message: 'All movies data found successfully',
      result: allMovies.map((obj) => new ResMovie(obj)),
      statusCode: HttpStatus.OK,
    });
  }

  @Public()
  @Get('/:id')
  async getMovie(@Res() response: Response, @Param() movieIdDto: MovieIdDto) {
    const existingMovie = await this.movieService.getMovie(movieIdDto);
    if (!existingMovie) {
      throw new NotFoundException(
        MovieController.NotFoundMessage(movieIdDto.id),
      );
    }
    return response.status(HttpStatus.OK).json({
      message: 'Movie found successfully',
      result: new ResMovie(existingMovie),
      statusCode: HttpStatus.OK,
    });
  }

  @Delete('/:id')
  async deleteMovie(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Param() movieIdDto: MovieIdDto,
  ) {
    const existingMovie = await this.movieService.getMovie(movieIdDto);
    if (!existingMovie) {
      throw new NotFoundException(
        MovieController.NotFoundMessage(movieIdDto.id),
      );
    }
    if (existingMovie.creatorUserId.toString() !== request.user.sub) {
      throw new ForbiddenException();
    }
    const deletedMovie = await this.movieService.deleteMovie(movieIdDto);
    return response.status(HttpStatus.OK).json({
      message: 'Movie deleted successfully',
      result: new ResMovie(deletedMovie),
      statusCode: HttpStatus.OK,
    });
  }

  private static NotFoundMessage(id: string) {
    return `Movie #${id} not found`;
  }
}
