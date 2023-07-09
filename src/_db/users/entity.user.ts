import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Класс используется для создания mongoose-схемы и mongoose-модели.
// Подробнее: https://docs.nestjs.com/techniques/mongodb#model-injection
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  login: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

// Mongoose-схема.
// Подробнее: https://mongoosejs.com/docs/guide.html
export const UserSchema = SchemaFactory.createForClass(User);

// Mongoose-схема возвращает объекты этого типа.
// Тип включает в себя свойство _id.
// Подробнее: https://mongoosejs.com/docs/typescript.html
/**
 * @prop **_id**: *ObjectID*
 * @prop **login**: *string*
 * @prop **username**: *string*
 * @prop **password**: *string*
 */
export type UserDocument = HydratedDocument<User>;
