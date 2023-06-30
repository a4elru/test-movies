import { JwtPayload } from './jwt.payload';
import { Types } from 'mongoose';

/**
 * GetMe**CS**dto:
 * - **2.** from **C**ontroller - to **S**ervice.
 * @prop readonly **id**: *ObjectId*
 */
export class GetMeCSdto {
  readonly id: Types.ObjectId;

  constructor(jwtPayload: JwtPayload) {
    this.id = new Types.ObjectId(jwtPayload.sub);
  }
}
