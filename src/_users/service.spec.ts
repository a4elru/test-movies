import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
          dbName: 'testmoviesdb',
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
