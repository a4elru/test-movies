import { ImageIdRCdto, MovieIdRCdto } from './dto.1.from.request';
import { Types } from 'mongoose';

/**
 * ToMovies_MovieId**SD**dto:
 * - **1.** from **S**ervice - to **D**atabase.
 * @prop readonly **id**: *ObjectId*
 * @description
 * transformation: *.movieId: string* => *.id: ObjectId*
 */
export class ToMovies_MovieIdSDdto {
  readonly id: Types.ObjectId;

  constructor(movieIdRCdto: MovieIdRCdto) {
    this.id = new Types.ObjectId(movieIdRCdto.movieId);
  }
}

/**
 * ToImages_MovieId**SD**dto:
 * - **1.** from **S**ervice - to **D**atabase.
 * @prop readonly **movieId**: *ObjectId*
 * @description
 * transformation: *.movieId: string* => *.movieId: ObjectId*
 */
export class ToImages_MovieIdSDdto {
  readonly movieId: Types.ObjectId;

  constructor(movieIdRCdto: MovieIdRCdto) {
    this.movieId = new Types.ObjectId(movieIdRCdto.movieId);
  }
}

/**
 * ToImages_ImageId**SD**dto:
 * - **1.** from **S**ervice - to **D**atabase.
 * @prop readonly **id**: *ObjectId*
 * @description
 * transformation: *.imageId: string* => *.id: ObjectId*
 */
export class ToImages_ImageIdSDdto {
  readonly id: Types.ObjectId;

  constructor(imageIdRCdto: ImageIdRCdto) {
    this.id = new Types.ObjectId(imageIdRCdto.imageId);
  }
}
