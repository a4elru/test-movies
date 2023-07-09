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
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
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
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

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
  async readAllMovies(@Res() response: ResponseWithEnvelope) {
    const allMovies = await this.moviesService.readAllMovies();
    return response.envelope(new CR.GetAllMoviesCRdto(allMovies));
  }

  @Public()
  @Get('/:movieId')
  @ApiResponse({ status: 200, type: CR.GetMovieCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundMovieExceptionCRdto })
  async readMovie(
    @Res() response: ResponseWithEnvelope,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
  ) {
    const existingMovie = await this.moviesService.readMovieById(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    return response.envelope(new CR.GetMovieCRdto(existingMovie));
  }

  @Put('/:movieId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CR.UpdateMovieCRdto })
  @ApiResponse({ status: 401, type: UnauthorizedExceptionCRdto })
  @ApiResponse({ status: 403, type: CR.ForbiddenExceptionCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundMovieExceptionCRdto })
  async updateMovie(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
    @Body() updateMovieRCdto: RC.UpdateMovieRCdto,
  ) {
    const existingMovie = await this.moviesService.readMovieById(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
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
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    return response.envelope(new CR.UpdateMovieCRdto(updatedMovie));
  }

  @Delete('/:movieId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CR.DeleteMovieCRdto })
  @ApiResponse({ status: 401, type: UnauthorizedExceptionCRdto })
  @ApiResponse({ status: 403, type: CR.ForbiddenExceptionCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundMovieExceptionCRdto })
  async deleteMovie(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
  ) {
    const existingMovie = await this.moviesService.readMovieById(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    const userId = request.user.sub;
    if (existingMovie.creatorUserId.toString() !== userId) {
      return response.envelope(new CR.ForbiddenExceptionCRdto(movieIdRCdto));
    }
    const deletedMovie = await this.moviesService.deleteMovie(movieIdRCdto);
    if (!deletedMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    return response.envelope(new CR.DeleteMovieCRdto(deletedMovie));
  }

  @Post('/:movieId/images')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: CR.AddImageForMovieCRdto })
  @ApiResponse({ status: 401, type: UnauthorizedExceptionCRdto })
  @ApiResponse({ status: 403, type: CR.ForbiddenExceptionCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundMovieExceptionCRdto })
  async addImageForMovie(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg' })
        .addMaxSizeValidator({ maxSize: 10 * 1024 /* bytes */ })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Body() body: RC.AddImageForMovieRCdto,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
  ) {
    const existingMovie = await this.moviesService.readMovieById(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    const userId = request.user.sub;
    if (existingMovie.creatorUserId.toString() !== userId) {
      return response.envelope(new CR.ForbiddenExceptionCRdto(movieIdRCdto));
    }
    const createdImage = await this.moviesService.addImageForMovie(
      movieIdRCdto,
      file,
    );
    if (!createdImage) {
      throw new Error('image not created');
    }
    return response.envelope(new CR.AddImageForMovieCRdto(createdImage));
  }

  @Delete('/:movieId/images/:imageId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CR.DeleteImageCRdto })
  @ApiResponse({ status: 401, type: UnauthorizedExceptionCRdto })
  @ApiResponse({ status: 403, type: CR.ForbiddenExceptionCRdto })
  @ApiResponse({ status: 404.2, type: CR.NotFoundImageExceptionCRdto })
  @ApiResponse({ status: 404.1, type: CR.NotFoundMovieExceptionCRdto })
  async removeImageForMovie(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Param() removeImageForMovie: RC.RemoveImageForMovieRCdto,
  ) {
    const movieIdRCdto =
      RC.MovieIdRCdto.fromRemoveImageForMovieRCdto(removeImageForMovie);
    const existingMovie = await this.moviesService.readMovieById(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    const userId = request.user.sub;
    if (existingMovie.creatorUserId.toString() !== userId) {
      return response.envelope(new CR.ForbiddenExceptionCRdto(movieIdRCdto));
    }
    const imageIdRCdto =
      RC.ImageIdRCdto.fromRemoveImageForMovieRCdto(removeImageForMovie);
    const existingImage = await this.moviesService.getImage(imageIdRCdto);
    if (!existingImage) {
      return response.envelope(
        new CR.NotFoundImageExceptionCRdto(imageIdRCdto),
      );
    }
    const deletedImage = await this.moviesService.deleteImage(imageIdRCdto);
    if (!deletedImage) {
      return response.envelope(
        new CR.NotFoundImageExceptionCRdto(imageIdRCdto),
      );
    }
    return response.envelope(new CR.DeleteImageCRdto(deletedImage));
  }

  @Public()
  @Get('/:movieId/images')
  @ApiResponse({ status: 200, type: CR.GetAllImagesCRdto })
  @ApiResponse({ status: 404, type: CR.NotFoundMovieExceptionCRdto })
  async getImagesForMovie(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
    @Param() movieIdRCdto: RC.MovieIdRCdto,
  ) {
    const existingMovie = await this.moviesService.readMovieById(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    const images = await this.moviesService.getImages(movieIdRCdto);
    return response.envelope(new CR.GetAllImagesCRdto(images));
  }

  @Public()
  @Get('/:movieId/images/:imageId')
  @ApiResponse({ status: 200, type: CR.GetImageCRdto })
  @ApiResponse({ status: 404.2, type: CR.NotFoundMovieExceptionCRdto })
  @ApiResponse({ status: 404.1, type: CR.NotFoundImageExceptionCRdto })
  async getImageForMovie(
    @Res() response: ResponseWithEnvelope,
    @Param() removeImageForMovie: RC.RemoveImageForMovieRCdto,
  ) {
    const movieIdRCdto =
      RC.MovieIdRCdto.fromRemoveImageForMovieRCdto(removeImageForMovie);
    const existingMovie = await this.moviesService.readMovieById(movieIdRCdto);
    if (!existingMovie) {
      return response.envelope(
        new CR.NotFoundMovieExceptionCRdto(movieIdRCdto),
      );
    }
    const imageIdRCdto =
      RC.ImageIdRCdto.fromRemoveImageForMovieRCdto(removeImageForMovie);
    const existingImage = await this.moviesService.getImage(imageIdRCdto);
    if (!existingImage) {
      return response.envelope(
        new CR.NotFoundImageExceptionCRdto(imageIdRCdto),
      );
    }
    return response.envelope(new CR.GetImageCRdto(existingImage));
  }
}
