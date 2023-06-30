import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieRCdto, MovieIdRCdto } from './dto.1.from.request';

/**
 * CreateMovie*CS*dto:
 * - **1.** from **C**onstroller - to **S**ervice.
 * @prop readonly **creatorUserId**: *ObjectId*
 * @extends CreateMovieRCdto {@link CreateMovieRCdto}
 */
export class CreateMovieCSdto extends CreateMovieRCdto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly creatorUserId: Types.ObjectId;

  static fromCreateMovieRCdto(
    createMovieRCdto: CreateMovieRCdto,
    creatorUserId: string,
  ): CreateMovieCSdto {
    const result = new CreateMovieRCdto(
      createMovieRCdto.title,
      createMovieRCdto.description,
    );
    (result as any).creatorUserId = new Types.ObjectId(creatorUserId);
    return result as CreateMovieCSdto;
  }
}

export class UpdateMovieCSdto extends PartialType(CreateMovieRCdto) {}

export class MovieIdCSdto extends MovieIdRCdto {}
