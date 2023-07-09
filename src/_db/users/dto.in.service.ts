import { Types } from 'mongoose';

/**
 * @prop readonly **id**: *ObjectID*
 */
export interface IIdDto {
  readonly id: Types.ObjectId;
}

/**
 * @prop readonly **login**: *string*
 * @prop readonly **password**: *string*
 * @prop readonly **username**: *string*
 */
export interface ICreateUserDto {
  readonly login: string;
  readonly password: string;
  readonly username: string;
}

/**
 * @extends Partial<ICreateUserDto> {@link ICreateUserDto}
 */
export type IReadUsersFilter = Partial<ICreateUserDto>;
