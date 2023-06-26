import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMovieRawDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  readonly description: string;

  constructor(title: string, description: string);
  constructor(createMovieRawDto: CreateMovieRawDto);
  constructor(...args: any[]) {
    if (args.length === 1) {
      this.title = args[0].title;
      this.description = args[0].description;
    } else if (args.length === 2) {
      this.title = args[0];
      this.description = args[1];
    }
  }
}
