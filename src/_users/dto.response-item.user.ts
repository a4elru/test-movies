import { UserDocument } from './user';

export class UserResponse {
  readonly id: string;
  readonly login: string;
  readonly username: string;

  constructor(obj: UserDocument) {
    this.id = obj?._id.toString();
    this.login = obj?.login;
    this.username = obj?.username;
  }
}
