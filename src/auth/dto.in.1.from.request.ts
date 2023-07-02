import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Login**RCS**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * - **2.** from **C**ontroller - to **S**ervice.
 * - **3.** from **S**ervice - to **D**atabase.
 * @prop readonly **login**: *string*
 * @prop readonly **password**: *string*
 */
export class LoginRCSdto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ example: 'LOGIN' })
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ example: 'PASSWORD' })
  readonly password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}

/**
 * SignUp**RCS**dto:
 * - **1.** from **R**equest - to **C**onstroller.
 * - **2.** from **C**ontroller - to **S**ervice.
 * @prop readonly **username**: *string*
 * @extends LoginRCSdto {@link LoginRCSdto}
 */
export class SignUpRCSdto extends LoginRCSdto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ example: 'USERNAME' })
  readonly username: string;

  constructor(login: string, password: string, username: string) {
    super(login, password);
    this.username = username;
  }
}
