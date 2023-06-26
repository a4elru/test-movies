import { Request } from 'express';
import { IJwtUser } from './auth.jwt-user.interface';

export interface RequestWithUser extends Request {
  user: IJwtUser;
}
