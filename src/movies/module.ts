import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie';
import { MoviesService } from './service';
import { MoviesController } from './controller';
import { addEnvelope } from './middleware.envelope';
import { StaticModule } from 'src/_static/module';
import { ImagesModule } from 'src/_images/module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    StaticModule,
    ImagesModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(addEnvelope).forRoutes('*');
  }
}
