import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MoviesService } from './service';
import { MoviesController } from './controller';
import { addEnvelope } from './middleware.envelope';
import { StaticModule } from 'src/_static/module';
import { DBImagesModule } from 'src/_db/images/module';
import { DBMoviesModule } from 'src/_db/movies/module';

@Module({
  imports: [DBMoviesModule, StaticModule, DBImagesModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(addEnvelope).forRoutes('*');
  }
}
