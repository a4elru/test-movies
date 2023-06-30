import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user';
import * as I from './dto.in.service';
import { MongoError } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(
    getUserByIdDto: I.IGetUserByIdDto,
  ): Promise<UserDocument | null> {
    const existingUser = await this.userModel.findById(getUserByIdDto.id);
    return existingUser;
  }

  async getUser(getUserDto: I.IGetUserDto): Promise<UserDocument | null> {
    const existingUser = await this.userModel.findOne(getUserDto);
    return existingUser;
  }

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
}
