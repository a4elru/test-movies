import { Types } from 'mongoose';

/**
 * IGetUserByIdDto:
 * @prop readonly **id**: *ObjectID*
 */
export interface IGetUserByIdDto {
  readonly id: Types.ObjectId;
}

/**
 * IGetUserDto:
 * @prop readonly **login**: *string*
 */
export interface IGetUserDto {
  readonly login: string;
}

/**
 * ICreateUserDto:
 * @prop readonly **password**: *string*
 * @prop readonly **username**: *string*
 * @extends {{@link IGetUserDto}
 */
export interface ICreateUserDto extends IGetUserDto {
  readonly password: string;
  readonly username: string;
}
