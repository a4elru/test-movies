import { HttpStatus } from '@nestjs/common';
import {
  BaseResponseBodyCRdto,
  ResultPropertyRaw,
} from './dto.response.base-obj';

// Successful responses

export class LoginCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Login completed successfully';
  readonly statusCode: number = HttpStatus.OK;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

export class SignUpCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Account has been created successfully';
  readonly statusCode: number = HttpStatus.CREATED;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

export class GetMeCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'OK';
  readonly statusCode: number = HttpStatus.OK;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

// Exceptions

export class UnauthorizedExceptionCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Unauthorized';
  readonly statusCode: number = HttpStatus.UNAUTHORIZED;

  constructor() {
    super(undefined);
  }
}

export class BadRequestExceptionCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Login or username exists';
  readonly statusCode: number = HttpStatus.BAD_REQUEST;

  constructor() {
    super(undefined);
  }
}
