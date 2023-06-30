import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './movie';
import * as CS from './dto.2.from.controller';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

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

  async getMovie(movieIdCSdto: CS.MovieIdCSdto): Promise<MovieDocument | null> {
    const existingMovie = await this.movieModel.findById(movieIdCSdto.id);
    return existingMovie;
  }

  async updateMovie(
    movieIdCSdto: CS.MovieIdCSdto,
    updateMovieCSdto: CS.UpdateMovieCSdto,
  ): Promise<MovieDocument | null> {
    const existingMovie = await this.movieModel.findByIdAndUpdate(
      movieIdCSdto.id,
      updateMovieCSdto,
      { new: true },
    );
    return existingMovie;
  }

  async deleteMovie(
    movieIdCSdto: CS.MovieIdCSdto,
  ): Promise<MovieDocument | null> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(
      movieIdCSdto.id,
    );
    return deletedMovie;
  }
}
