import { Types } from 'mongoose';

/** Objects of the type { sub: UserId } */
export class JwtPayload {
  /** Represents a user id. */
  readonly sub: string;

  constructor(sub: Types.ObjectId) {
    this.sub = sub.toString();
  }

  toPlainObj() {
    return { sub: this.sub };
  }
}
