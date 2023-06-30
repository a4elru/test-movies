import { MovieDocument } from './movie';

export class MovieResponse {
  readonly id: string;
  readonly creatorUserId: string;
  readonly title: string;
  readonly description: string;

  constructor(obj: MovieDocument) {
    this.id = obj?._id.toString();
    this.creatorUserId = obj?.creatorUserId.toString();
    this.title = obj?.title;
    this.description = obj?.description;
  }
}
