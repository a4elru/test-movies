import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { MoviesService } from './service';
import { RequestWithUser } from '../auth/request-with-user';
import { ResponseWithEnvelope } from './middleware.envelope';
import { Public } from '../auth/decorator.public-route';
import * as RC from './dto.1.from.request';
import { CreateMovieCSdto } from './dto.2.from.controller';
import * as CR from './dto.out.to.response';
import { UnauthorizedExceptionCRdto } from '../auth/dto.out.to.response';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CR.CreateMovieCRdto })
  @ApiResponse({ status: 401, type: UnauthorizedExceptionCRdto })
  async createMovie(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Body() createMovieRCdto: RC.CreateMovieRCdto,
  ) {
    const userId = request.user.sub;
    const createMovieCSdto = CreateMovieCSdto.fromCreateMovieRCdto(
      createMovieRCdto,
      userId,
    );
    const createdMovie = await this.moviesService.createMovie(createMovieCSdto);
    return response.envelope(new CR.CreateMovieCRdto(createdMovie));
  }

  @Public()
  @Get()
  @ApiResponse({ status: 200, type: CR.GetAllMoviesCRdto })
  async getAllMovies(@Res() response: ResponseWithEnvelope) {
    const allMovies = await this.moviesService.getAllMovies();
    return response.envelope(new CR.GetAllMoviesCRdto(allMovies));
  }

  @Public()
  @Get('/:id')
  @ApiResponse({ status: 200, type: CR.GetMovieCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundExceptionCRdto })
  async getMovie(
    @Res() response: ResponseWithEnvelope,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
  ) {
    const existingMovie = await this.moviesService.getMovie(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(new CR.NotFoundExceptionCRdto(movieIdRCdto));
    }
    return response.envelope(new CR.GetMovieCRdto(existingMovie));
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CR.UpdateMovieCRdto })
  @ApiResponse({ status: 401, type: UnauthorizedExceptionCRdto })
  @ApiResponse({ status: 403, type: CR.ForbiddenExceptionCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundExceptionCRdto })
  async updateMovie(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
    @Body() updateMovieRCdto: RC.UpdateMovieRCdto,
  ) {
    const existingMovie = await this.moviesService.getMovie(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(new CR.NotFoundExceptionCRdto(movieIdRCdto));
    }
    const userId = request.user.sub;
    if (existingMovie.creatorUserId.toString() !== userId) {
      return response.envelope(new CR.ForbiddenExceptionCRdto(movieIdRCdto));
    }
    const updatedMovie = await this.moviesService.updateMovie(
      movieIdRCdto,
      updateMovieRCdto,
    );
    if (!updatedMovie) {
      return response.envelope(new CR.NotFoundExceptionCRdto(movieIdRCdto));
    }
    return response.envelope(new CR.UpdateMovieCRdto(updatedMovie));
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CR.DeleteMovieCRdto })
  @ApiResponse({ status: 401, type: UnauthorizedExceptionCRdto })
  @ApiResponse({ status: 403, type: CR.ForbiddenExceptionCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundExceptionCRdto })
  async deleteMovie(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
  ) {
    const existingMovie = await this.moviesService.getMovie(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(new CR.NotFoundExceptionCRdto(movieIdRCdto));
    }
    const userId = request.user.sub;
    if (existingMovie.creatorUserId.toString() !== userId) {
      return response.envelope(new CR.ForbiddenExceptionCRdto(movieIdRCdto));
    }
    const deletedMovie = await this.moviesService.deleteMovie(movieIdRCdto);
    if (!deletedMovie) {
      return response.envelope(new CR.NotFoundExceptionCRdto(movieIdRCdto));
    }
    return response.envelope(new CR.DeleteMovieCRdto(deletedMovie));
  }
}
