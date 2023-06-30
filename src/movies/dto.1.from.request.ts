import { IsString, IsNotEmpty, MaxLength, IsMongoId } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

/**
 * SignUp**RCS**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * - **2.** from **C**ontroller - to **S**ervice.
 * @extends CreateMovieRCdto PartialType({@link CreateMovieRCdto})
 */
export class UpdateMovieRCdto extends PartialType(CreateMovieRCdto) {}

/**
 * SignUp**RCS**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * - **2.** from **C**ontroller - to **S**ervice.
 * @extends CreateMovieRCdto PartialType({@link CreateMovieRCdto})
 */
export class MovieIdRCdto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
