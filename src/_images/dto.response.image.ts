import { ImageDocument } from './image';
import { ApiProperty } from '@nestjs/swagger';

const example = {
  id: '542c2b97bac0595474108b48',
  movieId: '542c2b97bac0595474108b41',
  link: '/static/542c2b97bac0595474108b41.jpeg',
};

export class ImageResponse {
  @ApiProperty({ example: example.id })
  readonly id: string;
  @ApiProperty({ example: example.movieId })
  readonly movieId: string;
  @ApiProperty({ example: example.link })
  readonly link: string;

  constructor(obj: ImageDocument) {
    this.id = obj?._id.toString();
    this.movieId = obj?.movieId.toString();
    this.link = obj?.link;
  }
}
