import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './movie';
import { MovieIdRCdto } from './dto.1.from.request';
import * as CS from './dto.2.from.controller';
import { ImagesService } from 'src/_images/service';
import { StaticService } from 'src/_static/service';
import { ImageDocument } from 'src/_images/image';
import { ImageIdSDdto, MovieIdSDdto } from './dto.3.from.service';
import { ImageIdRCdto } from './dto.1.from.request';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    private readonly imagesService: ImagesService,
    private readonly staticService: StaticService,
  ) {}

  async createMovie(
    createMovieCSdto: CS.CreateMovieCSdto,
  ): Promise<MovieDocument> {
    const newMovie = new this.movieModel(createMovieCSdto);
    return await newMovie.save();
  }

  async getAllMovies(): Promise<MovieDocument[]> {
    const allMovies = await this.movieModel.find();
    return allMovies;
  }

  async getMovie(movieIdCSdto: MovieIdRCdto): Promise<MovieDocument | null> {
    const existingMovie = await this.movieModel.findById(movieIdCSdto.movieId);
    return existingMovie;
  }

  async updateMovie(
    movieIdCSdto: MovieIdRCdto,
    updateMovieCSdto: CS.UpdateMovieCSdto,
  ): Promise<MovieDocument | null> {
    const existingMovie = await this.movieModel.findByIdAndUpdate(
      movieIdCSdto.movieId,
      updateMovieCSdto,
      { new: true },
    );
    return existingMovie;
  }

  async deleteMovie(movieIdCSdto: MovieIdRCdto): Promise<MovieDocument | null> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(
      movieIdCSdto.movieId,
    );
    return deletedMovie;
  }

  async addImageForMovie(
    movieIdCSdto: MovieIdRCdto,
    file: Express.Multer.File,
  ): Promise<ImageDocument> {
    const movieIdSDdto = new MovieIdSDdto(movieIdCSdto);
    const createdImage = await this.imagesService.createImage(movieIdSDdto);
    const imageId = createdImage._id.toString();
    // todo: if saving is failed - intercept error, back changes
    await this.staticService.saveImage(imageId, file);
    return createdImage;
  }

  async deleteImage(imageIdRCdto: ImageIdRCdto) {
    const imageIdSDdto = new ImageIdSDdto(imageIdRCdto);
    const deletedImage = await this.imagesService.deleteImageById(imageIdSDdto);
    if (!deletedImage) {
      return deletedImage;
    }
    const imageId = deletedImage._id.toString();
    await this.staticService.removeImage(imageId);
    return deletedImage;
  }

  async getImage(imageIdRCdto: ImageIdRCdto) {
    const imageIdSDdto = new ImageIdSDdto(imageIdRCdto);
    const existingImage = await this.imagesService.getImageById(imageIdSDdto);
    return existingImage;
  }

  async getImages(movieIdCSdto: MovieIdRCdto) {
    const movieIdSDdto = new MovieIdSDdto(movieIdCSdto);
    const images = await this.imagesService.getImagesByMovieId(movieIdSDdto);
    return images;
  }
}
