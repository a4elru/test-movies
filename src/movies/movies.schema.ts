import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class Movie {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  creatorUserId: Types.ObjectId;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
