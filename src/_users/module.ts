import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user';
import { UsersService } from './service';

@Module({
  imports: [
    // Подключить mongoose-модель User.
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  // Разрешить доступ к UsersService во внешних модулях.
  exports: [UsersService],
})
export class UsersModule {}
