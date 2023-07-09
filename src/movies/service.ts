import { Injectable } from '@nestjs/common';
import { DBMoviesService } from '../_db/movies/service';
import { DBImagesService } from '../_db/images/service';
import { StaticService } from '../_static/service';
import { MovieDocument } from '../_db/movies/entity.movie';
import { ImageDocument } from '../_db/images/entity.image';
import { MovieIdRCdto, ImageIdRCdto } from './dto.1.from.request';
import * as CS from './dto.2.from.controller';
import * as SD from './dto.3.from.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly dbMoviesService: DBMoviesService,
    private readonly dbImagesService: DBImagesService,
    private readonly staticService: StaticService,
  ) {}

  async createMovie(
    createMovieCSdto: CS.CreateMovieCSdto,
  ): Promise<MovieDocument> {
    const newMovie = await this.dbMoviesService.createMovie(createMovieCSdto);
    return newMovie;
  }

  async readAllMovies(): Promise<MovieDocument[]> {
    const allMovies = await this.dbMoviesService.readAllMovies();
    return allMovies;
  }

  async readMovieById(
    movieIdCSdto: MovieIdRCdto,
  ): Promise<MovieDocument | null> {
    const movieIdSDdto = new SD.ToMovies_MovieIdSDdto(movieIdCSdto);
    const existingMovie = await this.dbMoviesService.readMovieById(
      movieIdSDdto,
    );
    return existingMovie;
  }

  async updateMovie(
    movieIdCSdto: MovieIdRCdto,
    updateMovieCSdto: CS.UpdateMovieCSdto,
  ): Promise<MovieDocument | null> {
    const movieIdSDdto = new SD.ToMovies_MovieIdSDdto(movieIdCSdto);
    const updatedMovie = await this.dbMoviesService.updateMovieById(
      movieIdSDdto,
      updateMovieCSdto,
    );
    return updatedMovie;
  }

  async deleteMovie(movieIdCSdto: MovieIdRCdto): Promise<MovieDocument | null> {
    const movieIdSDdto = new SD.ToMovies_MovieIdSDdto(movieIdCSdto);
    const deletedMovie = await this.dbMoviesService.deleteMovieById(
      movieIdSDdto,
    );
    return deletedMovie;
  }

  async addImageForMovie(
    movieIdCSdto: MovieIdRCdto,
    file: Express.Multer.File,
  ): Promise<ImageDocument> {
    const movieIdSDdto = new SD.ToImages_MovieIdSDdto(movieIdCSdto);
    const createdImage = await this.dbImagesService.createImage(movieIdSDdto);
    const imageId = createdImage._id.toString();
    // todo: if saving is failed - intercept error, back changes
    await this.staticService.saveImage(imageId, file);
    return createdImage;
  }

  async deleteImage(imageIdRCdto: ImageIdRCdto) {
    const imageIdSDdto = new SD.ToImages_ImageIdSDdto(imageIdRCdto);
    const deletedImage = await this.dbImagesService.deleteImageById(
      imageIdSDdto,
    );
    if (!deletedImage) {
      return deletedImage;
    }
    const imageId = deletedImage._id.toString();
    await this.staticService.removeImage(imageId);
    return deletedImage;
  }

  async getImage(imageIdRCdto: ImageIdRCdto) {
    const imageIdSDdto = new SD.ToImages_ImageIdSDdto(imageIdRCdto);
    const existingImage = await this.dbImagesService.readImageById(
      imageIdSDdto,
    );
    return existingImage;
  }

  async getImages(movieIdCSdto: MovieIdRCdto) {
    const movieIdSDdto = new SD.ToImages_MovieIdSDdto(movieIdCSdto);
    const images = await this.dbImagesService.readImages(movieIdSDdto);
    return images;
  }
}
