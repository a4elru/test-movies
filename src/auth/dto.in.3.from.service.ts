import * as R from './dto.in.1.from.request';
import * as C from './dto.in.2.from.controller';
import * as I from '../_db/users/dto.in.service';

/**
 * Login**SD**dto:
 * - **3.** from **S**ervice - to **D**atabase.
 * @implements - {@link I.IReadUsersFilter}
 */
export class LoginSDdto implements I.IReadUsersFilter {
  readonly login: string;

  constructor(login: string) {
    this.login = login;
  }
}

/**
 * SignUp**SD**dto:
 * - **3.** from **S**ervice - to **D**atabase.
 * @extends SignUpRCSdto {@link R.SignUpRCSdto}
 * @implements - {@link I.ICreateUserDto}
 */
export class SignUpSDdto extends R.SignUpRCSdto implements I.ICreateUserDto {
  static fromSignUpRCSdto(
    signUpRCSdto: R.SignUpRCSdto,
    hashedPassword: string,
  ): SignUpSDdto {
    return new R.SignUpRCSdto(
      signUpRCSdto.login,
      hashedPassword,
      signUpRCSdto.username,
    );
  }
}

export class GetMeSDdto extends C.GetMeCSdto implements I.IIdDto {}
