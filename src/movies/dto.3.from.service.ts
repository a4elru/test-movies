import { ImageIdRCdto, MovieIdRCdto } from './dto.1.from.request';
import { Types } from 'mongoose';

/**
 * MovieId**SD**dto:
 * - **1.** from **S**ervice - to **D**atabase.
 * @prop readonly **movieId**: *ObjectId*
 */
export class MovieIdSDdto {
  readonly movieId: Types.ObjectId;

  constructor(movieIdRCdto: MovieIdRCdto) {
    this.movieId = new Types.ObjectId(movieIdRCdto.movieId);
  }
}

/**
 * ImageId**SD**dto:
 * - **1.** from **S**ervice - to **D**atabase.
 * @prop readonly **imageId**: *ObjectId*
 */
export class ImageIdSDdto {
  readonly id: Types.ObjectId;

  constructor(imageIdRCdto: ImageIdRCdto) {
    this.id = new Types.ObjectId(imageIdRCdto.imageId);
  }
}
