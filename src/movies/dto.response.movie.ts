import { MovieDocument } from './movie';
import { ApiProperty } from '@nestjs/swagger';

const example = {
  id: '542c2b97bac0595474108b48',
  creatorUserId: '542c2b97bac0595474108b42',
  title: 'The Title',
  description: 'The description',
}

export class MovieResponse {
  @ApiProperty({ example: example.id })
  readonly id: string;
  @ApiProperty({ example: example.creatorUserId })
  readonly creatorUserId: string;
  @ApiProperty({ example: example.title })
  readonly title: string;
  @ApiProperty({ example: example.description })
  readonly description: string;

  constructor(obj: MovieDocument) {
    this.id = obj?._id.toString();
    this.creatorUserId = obj?.creatorUserId.toString();
    this.title = obj?.title;
    this.description = obj?.description;
  }
}
