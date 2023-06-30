import { Request } from 'express';
import { JwtPayload } from './jwt.payload';

/**
 * @prop **user**: *JwtPayload*
 * @extends Request {@link Request}
 */
export interface RequestWithUser extends Request {
  user: JwtPayload;
}
