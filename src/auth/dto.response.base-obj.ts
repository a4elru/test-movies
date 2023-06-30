import { UserDocument } from '../_users/user';
import { UserResponse } from '../_users/dto.response-item.user';
import { AccessTokenValue } from './jwt.access-token.type';
import { AccessTokenResponse } from './dto.response.access-token';

export type ResultPropertyRaw = AccessTokenValue | UserDocument | undefined;

export type ResultProperty = AccessTokenResponse | UserResponse | undefined;

export abstract class BaseResponseBodyCRdto {
  readonly message: string;
  readonly result: ResultProperty;
  readonly statusCode: number;

  constructor(resultRaw: ResultPropertyRaw) {
    this.message = 'first field in obj';
    if (typeof resultRaw === 'string') {
      this.result = new AccessTokenResponse(resultRaw);
    } else if (resultRaw !== undefined) {
      this.result = new UserResponse(resultRaw);
    }
  }
}
