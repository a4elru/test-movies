import { Types } from 'mongoose';

/**
 * @prop readonly **id**: *ObjectID*
 */
export interface IIdDto {
  readonly id: Types.ObjectId;
}

/**
 * @prop readonly **movieId**: *ObjectID*
 */
export interface ICreateImageDto {
  readonly movieId: Types.ObjectId;
}

/**
 * @extends Partial<ICreateImageDto> {@link ICreateImageDto}
 */
export type IReadImagesFilter = Partial<ICreateImageDto>;
