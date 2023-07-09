import { Module } from '@nestjs/common';
import { DBModule } from '../root.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity.user';
import { DBUsersService } from './service';

@Module({
  imports: [
    DBModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [DBUsersService],
  exports: [DBUsersService],
})
export class DBUsersModule {}
