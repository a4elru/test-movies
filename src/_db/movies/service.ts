import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './entity.movie';
import * as I from './dto.in.service';

@Injectable()
export class DBMoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async createMovie(createMovieDto: I.ICreateMovieDto): Promise<MovieDocument> {
    const newMovie = new this.movieModel(createMovieDto);
    return await newMovie.save();
  }

  async readMovieById(idDto: I.IIdDto): Promise<MovieDocument | null> {
    const existingMovie = await this.movieModel.findById(idDto.id);
    return existingMovie;
  }

  async readAllMovies(): Promise<MovieDocument[]> {
    const allMovies = await this.movieModel.find();
    return allMovies;
  }

  async updateMovieById(
    idDto: I.IIdDto,
    updateMovieDto: I.IUpdateMovieDto,
  ): Promise<MovieDocument | null> {
    const updatedMovie = await this.movieModel.findByIdAndUpdate(
      idDto.id,
      updateMovieDto,
      { new: true },
    );
    return updatedMovie;
  }

  async deleteMovieById(idDto: I.IIdDto): Promise<MovieDocument | null> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(idDto.id);
    return deletedMovie;
  }
}
