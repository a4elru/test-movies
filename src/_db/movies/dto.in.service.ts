import { Types } from 'mongoose';

/**
 * @prop readonly **id**: *ObjectID*
 */
export interface IIdDto {
  readonly id: Types.ObjectId;
}

/**
 * @prop readonly **title**?: *string*
 * @prop readonly **description**?: *string*
 */
export interface IUpdateMovieDto {
  readonly title?: string;
  readonly description?: string;
}

/**
 * @prop readonly **creatorUserId**: *ObjectID*
 * @extends Required<IUpdateMovieDto> {@link IUpdateMovieDto}
 */
export interface ICreateMovieDto extends Required<IUpdateMovieDto> {
  readonly creatorUserId: Types.ObjectId;
}
