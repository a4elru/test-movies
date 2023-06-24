export class ResUser {
  readonly login: string;
  readonly username: string;
  readonly password: string;

  constructor(obj: any) {
    this.login = obj?.login || obj?.sub;
    this.username = obj?.username;
  }
}
