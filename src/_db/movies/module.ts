import { Module } from '@nestjs/common';
import { DBModule } from '../root.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './entity.movie';
import { DBMoviesService } from './service';

@Module({
  imports: [
    DBModule,
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  providers: [DBMoviesService],
  exports: [DBMoviesService],
})
export class DBMoviesModule {}
