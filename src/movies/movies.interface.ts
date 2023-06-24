import { Document } from 'mongoose';

export interface IMovie extends Document {
  readonly title: string;
  readonly description: string;
}
