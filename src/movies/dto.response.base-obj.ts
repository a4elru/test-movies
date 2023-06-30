import { MovieDocument } from './movie';
import { MovieResponse } from './dto.response.movie';

export type ResultPropertyRaw = MovieDocument | MovieDocument[] | undefined;

export type ResultProperty = MovieResponse | MovieResponse[] | undefined;

export abstract class BaseResponseBodyCRdto {
  readonly message: string;
  readonly result: ResultProperty;
  readonly statusCode: number;

  constructor(resultRaw: ResultPropertyRaw) {
    this.message = 'first field in obj';
    if (resultRaw instanceof Array) {
      this.result = resultRaw.map((movie) => new MovieResponse(movie));
    } else if (resultRaw !== undefined) {
      this.result = new MovieResponse(resultRaw);
    }
  }
}
