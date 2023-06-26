import { Document, Types } from 'mongoose';

export interface IMovie extends Document {
  readonly creatorUserId: Types.ObjectId;
  readonly title: string;
  readonly description: string;
}
