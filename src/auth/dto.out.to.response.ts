import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '../_db/users/dto.response.user';
import { UserDocument } from '../_db/users/entity.user';
import { AccessTokenValue } from './jwt.access-token.type';
import { AccessTokenResponse } from './dto.response.access-token';

export interface IResponseCRdto {
  message: string;
  result?: UserResponse | AccessTokenResponse;
  statusCode: number;
}

// Successful responses

export class LoginCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Login completed successfully' })
  readonly message: string = 'Login completed successfully';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: AccessTokenResponse })
  readonly result: AccessTokenResponse;

  constructor(accessToken: AccessTokenValue) {
    this.result = new AccessTokenResponse(accessToken);
  }
}

export class SignUpCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Account has been created successfully' })
  readonly message: string = 'Account has been created successfully';
  @ApiProperty({ default: HttpStatus.CREATED })
  readonly statusCode: number = HttpStatus.CREATED;
  @ApiProperty({ type: UserResponse })
  readonly result: UserResponse;

  constructor(user: UserDocument) {
    this.result = new UserResponse(user);
  }
}

export class GetMeCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'OK' })
  readonly message: string = 'OK';
  @ApiProperty({ default: HttpStatus.OK })
  readonly statusCode: number = HttpStatus.OK;
  @ApiProperty({ type: UserResponse })
  readonly result: UserResponse;

  constructor(user: UserDocument) {
    this.result = new UserResponse(user);
  }
}

// Exceptions

export class UnauthorizedExceptionCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Unauthorized' })
  readonly message: string = 'Unauthorized';
  @ApiProperty({ default: HttpStatus.UNAUTHORIZED })
  readonly statusCode: number = HttpStatus.UNAUTHORIZED;
}

export class BadRequestExceptionCRdto implements IResponseCRdto {
  @ApiProperty({ default: 'Login or username exists' })
  readonly message: string = 'Login or username exists';
  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  readonly statusCode: number = HttpStatus.BAD_REQUEST;
}
