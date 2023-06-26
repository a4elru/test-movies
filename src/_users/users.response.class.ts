export class ResUser {
  readonly id: string;
  readonly login: string;
  readonly username: string;

  constructor(obj: any) {
    this.id = obj?._id || obj?.sub;
    this.login = obj?.login;
    this.username = obj?.username;
  }
}
