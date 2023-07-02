import { AccessTokenValue } from './jwt.access-token.type';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponse {
  @ApiProperty({ example: 'ACCESS_TOKEN' })
  readonly access_token: AccessTokenValue;

  constructor(accessToken: AccessTokenValue) {
    this.access_token = accessToken;
  }
}
