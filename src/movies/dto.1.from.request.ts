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
 * SignUp**RCS**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * - **2.** from **C**ontroller - to **S**ervice.
 * @extends CreateMovieRCdto PartialType({@link CreateMovieRCdto})
 */
export class UpdateMovieRCdto extends PartialType(CreateMovieRCdto) {}

/**
 * MovieId**RCS**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * @prop readonly **id**: *string*
 */
export class MovieIdRCdto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '542c2b97bac0595474108b48' })
  readonly id: string;
}
