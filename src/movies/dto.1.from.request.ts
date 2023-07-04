import { IsString, IsNotEmpty, MaxLength, IsMongoId } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

/**
 * CreateMovie*RC*dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * @prop readonly **title**: *string*
 * @prop readonly **description**: *string*
 */
export class CreateMovieRCdto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ example: 'The Title' })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty({ example: 'The description' })
  readonly description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

/**
 * UpdateMovie**RC**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * @extends CreateMovieRCdto PartialType({@link CreateMovieRCdto})
 */
export class UpdateMovieRCdto extends PartialType(CreateMovieRCdto) {}

/**
 * MovieId**RC**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * @prop readonly **movieId**: *string*
 */
export class MovieIdRCdto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '542c2b97bac0595474108b48' })
  readonly movieId: string;

  constructor(movieId: string) {
    this.movieId = movieId;
  }

  static fromRemoveImageForMovieRCdto(
    removeImageForMovieRCdto: RemoveImageForMovieRCdto,
  ): MovieIdRCdto {
    const result = new MovieIdRCdto(removeImageForMovieRCdto.movieId);
    return result;
  }
}

/**
 * ImageId**RC**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * @prop readonly **imageId**: *string*
 */
export class RemoveImageForMovieRCdto extends MovieIdRCdto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '542c2b97bac0595474108b50' })
  readonly imageId: string;
}

export class ImageIdRCdto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '542c2b97bac0595474108b50' })
  readonly imageId: string;

  constructor(imageId: string) {
    this.imageId = imageId;
  }

  static fromRemoveImageForMovieRCdto(
    removeImageForMovieRCdto: RemoveImageForMovieRCdto,
  ): ImageIdRCdto {
    const result = new ImageIdRCdto(removeImageForMovieRCdto.imageId);
    return result;
  }
}

export class AddImageForMovieRCdto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}
