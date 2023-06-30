import { HttpStatus } from '@nestjs/common';
import {
  BaseResponseBodyCRdto,
  ResultPropertyRaw,
} from './dto.response.base-obj';
import { MovieIdRCdto } from './dto.1.from.request';

// Successful responses

export class CreateMovieCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Movie has been created successfully';
  readonly statusCode: number = HttpStatus.CREATED;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

export class GetAllMoviesCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'All movies data found successfully';
  readonly statusCode: number = HttpStatus.OK;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

export class GetMovieCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Movie found successfully';
  readonly statusCode: number = HttpStatus.OK;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

export class UpdateMovieCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Movie has been successfully updated';
  readonly statusCode: number = HttpStatus.OK;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

export class DeleteMovieCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Movie deleted successfully';
  readonly statusCode: number = HttpStatus.OK;

  constructor(resultPropertyRaw: ResultPropertyRaw) {
    super(resultPropertyRaw);
  }
}

// Exceptions

export class NotFoundExceptionCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Movie #{id} not found';
  readonly statusCode: number = HttpStatus.NOT_FOUND;

  constructor(movieIdRCdto: MovieIdRCdto) {
    super(undefined);
    this.message = `Movie #${movieIdRCdto.id} not found`;
  }
}

export class ForbiddenExceptionCRdto extends BaseResponseBodyCRdto {
  readonly message: string = 'Access to movie #{id} is forbidden';
  readonly statusCode: number = HttpStatus.FORBIDDEN;

  constructor(movieIdRCdto: MovieIdRCdto) {
    super(undefined);
    this.message = `Access to movie #${movieIdRCdto.id} is forbidden`;
  }
}
