import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
          dbName: 'testmoviesdb',
        }),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
      ],
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
