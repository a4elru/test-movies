import { Types } from 'mongoose';

/**
 * ICreateImageDto:
 * @prop readonly **movieId**: *ObjectID*
 */
export interface IMovieIdDto {
  readonly movieId: Types.ObjectId;
}

/**
 * IGetImageByIdDto:
 * @prop readonly **id**: *ObjectID*
 */
export interface IIdDto {
  readonly id: Types.ObjectId;
}
