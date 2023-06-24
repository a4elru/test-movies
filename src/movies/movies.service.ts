import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovie } from './movies.interface';
import { Movie } from './movies.schema';
import { MovieIdDto } from './movies.dto.movie-id';
import { CreateMovieDto } from './movies.dto.create-movie';
import { UpdateMovieDto } from './movies.dto.update-movie';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<IMovie>) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<IMovie> {
    const newMovie = await new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  async updateMovie(
    movieIdDto: MovieIdDto,
    updateMovieDto: UpdateMovieDto,
  ): Promise<IMovie | null> {
    const existingMovie = await this.movieModel.findByIdAndUpdate(
      movieIdDto.id,
      updateMovieDto,
      { new: true },
    );
    return existingMovie;
  }

  async getAllMovies(): Promise<IMovie[]> {
    const movieData = await this.movieModel.find();
    return movieData;
  }

  async getMovie(movieIdDto: MovieIdDto): Promise<IMovie | null> {
    const existingMovie = await this.movieModel.findById(movieIdDto.id).exec();
    return existingMovie;
  }

  async deleteMovie(movieIdDto: MovieIdDto): Promise<IMovie | null> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(movieIdDto.id);
    return deletedMovie;
  }
}
