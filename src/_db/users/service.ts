import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entity.user';
import * as I from './dto.in.service';
import { MongoError } from 'mongodb';

@Injectable()
export class DBUsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    createUserDto: I.ICreateUserDto,
  ): Promise<UserDocument | null> {
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (err) {
      if (err instanceof MongoError && err.code === 11000) {
        // нарушение ограничения { unique: true }
        return null;
      } else {
        throw err;
      }
    }
  }

  async readUserById(idDto: I.IIdDto): Promise<UserDocument | null> {
    const existingUser = await this.userModel.findById(idDto.id);
    return existingUser;
  }

  async readOneUser(
    readUsersFilter: I.IReadUsersFilter,
  ): Promise<UserDocument | null> {
    const existingUser = await this.userModel.findOne(readUsersFilter);
    return existingUser;
  }
}
