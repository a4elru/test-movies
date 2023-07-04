import { UserDocument } from './user';
import { ApiProperty } from '@nestjs/swagger';

const example = {
  id: '542c2b97bac0595474108b48',
  login: 'LOGIN',
  username: 'USERNAME',
};

export class UserResponse {
  @ApiProperty({ example: example.id })
  readonly id: string;
  @ApiProperty({ example: example.login })
  readonly login: string;
  @ApiProperty({ example: example.username })
  readonly username: string;

  constructor(obj: UserDocument) {
    this.id = obj?._id.toString();
    this.login = obj?.login;
    this.username = obj?.username;
  }
}
