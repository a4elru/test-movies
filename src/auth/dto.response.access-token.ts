import { AccessTokenValue } from './jwt.access-token.type';

export class AccessTokenResponse {
  readonly access_token: AccessTokenValue;

  constructor(accessToken: AccessTokenValue) {
    this.access_token = accessToken;
  }
}
