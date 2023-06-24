import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly login: string;
  readonly username: string;
  readonly password: string;
}
