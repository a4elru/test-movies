import { Module } from '@nestjs/common';
import { DBModule } from '../root.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './entity.image';
import { DBImagesService } from './service';

@Module({
  imports: [
    DBModule,
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  providers: [DBImagesService],
  exports: [DBImagesService],
})
export class DBImagesModule {}
