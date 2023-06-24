import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.interface';
import { User } from './users.schema';
import { CreateUserDto } from './users.dto.create-user';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async getUser(login: string): Promise<IUser | null> {
    const existingUser = await this.userModel.findOne({ login }).exec();
    return existingUser;
  }
}
