import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/_users/users.service';
import { LoginDto } from './auth.dto.login';
import { CreateUserDto } from 'src/_users/users.dto.create-user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { password, ...data } = createUserDto; // eslint-disable-line @typescript-eslint/no-unused-vars
    const createUserDtoHashed: CreateUserDto = {
      password: await bcrypt.hash(createUserDto.password, this.saltRounds),
      ...data,
    };
    const newUser = await this.userService.createUser(createUserDtoHashed);
    return newUser;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.getUser(loginDto.login);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.login,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
