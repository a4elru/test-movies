import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, HydratedDocument } from 'mongoose';
import { Movie } from '../movies/entity.movie';

// Класс используется для создания mongoose-схемы и mongoose-модели.
// Подробнее: https://docs.nestjs.com/techniques/mongodb#model-injection
@Schema()
export class Image {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Movie.name })
  movieId: Types.ObjectId;

  @Prop({ unique: true })
  link: string;
}

// Mongoose-схема.
// Подробнее: https://mongoosejs.com/docs/guide.html
export const ImageSchema = SchemaFactory.createForClass(Image);

// Mongoose-схема возвращает объекты этого типа.
// Тип включает в себя свойство _id.
// Подробнее: https://mongoosejs.com/docs/typescript.html
/**
 * @prop **_id**: *ObjectID*
 * @prop **movieId**: *ObjectId*
 * @prop **link**: *string*
 */
export type ImageDocument = HydratedDocument<Image>;
