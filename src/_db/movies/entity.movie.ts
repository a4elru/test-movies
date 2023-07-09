import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, HydratedDocument } from 'mongoose';
import { User } from '../users/entity.user'; // ?

// Класс используется для создания mongoose-схемы и mongoose-модели.
// Подробнее: https://docs.nestjs.com/techniques/mongodb#model-injection
@Schema()
export class Movie {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  creatorUserId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

// Mongoose-схема.
// Подробнее: https://mongoosejs.com/docs/guide.html
export const MovieSchema = SchemaFactory.createForClass(Movie);

// Mongoose-схема возвращает объекты этого типа.
// Тип включает в себя свойство _id.
// Подробнее: https://mongoosejs.com/docs/typescript.html
/**
 * @prop **_id**: *ObjectID*
 * @prop **creatorUserId**: *ObjectId*
 * @prop **title**: *string*
 * @prop **description**: *string*
 */
export type MovieDocument = HydratedDocument<Movie>;
