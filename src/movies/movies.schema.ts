import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Movie {
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
