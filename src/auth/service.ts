import { Injectable } from '@nestjs/common';
import { DBUsersService } from '../_db/users/service';
import { UserDocument } from '../_db/users/entity.user';
import { JwtService } from '@nestjs/jwt';
import * as R from './dto.in.1.from.request';
import * as C from './dto.in.2.from.controller';
import * as S from './dto.in.3.from.service';
import * as bcrypt from 'bcrypt';
import { saltRounds } from './jwt.constants';
import { JwtPayload } from './jwt.payload';
import { AccessTokenValue } from './jwt.access-token.type';

@Injectable()
export class AuthService {
  constructor(
    private dbUsersService: DBUsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginRCSDdto: R.LoginRCSdto): Promise<AccessTokenValue | null> {
    const loginSDdto = new S.LoginSDdto(loginRCSDdto.login);
    const user = await this.dbUsersService.readOneUser(loginSDdto);
    if (
      !user ||
      !(await bcrypt.compare(loginRCSDdto.password, user.password))
    ) {
      return null;
    }
    const payload = new JwtPayload(user._id);
    const accessToken = await this.jwtService.signAsync(payload.toPlainObj());
    return accessToken;
  }

  async signUp(signUpRCSdto: R.SignUpRCSdto): Promise<UserDocument | null> {
    const hashedPassword = await bcrypt.hash(signUpRCSdto.password, saltRounds);
    const signUpSDdto = S.SignUpSDdto.fromSignUpRCSdto(
      signUpRCSdto,
      hashedPassword,
    );
    const newUser = await this.dbUsersService.createUser(signUpSDdto);
    return newUser;
  }

  async getMe(getMeCSdto: C.GetMeCSdto): Promise<UserDocument | null> {
    const existingUser = await this.dbUsersService.readUserById(getMeCSdto);
    return existingUser;
  }
}
