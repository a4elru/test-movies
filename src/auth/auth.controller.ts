import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto.login';
import { CreateUserDto } from 'src/_users/users.dto.create-user';
import { Response } from 'express';
import { RequestWithUser } from './auth.request-with-user';
import { Public } from './auth.decorator.public-route';
import { ResUser } from 'src/_users/users.response.class';
import { MongoError } from 'mongodb';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    let result;
    try {
      result = await this.authService.signUp(createUserDto);
    } catch (err) {
      if (err instanceof MongoError && err.code === 11000) {
        throw new BadRequestException('Login or username exists');
      }
      throw err;
    }
    return response.status(HttpStatus.CREATED).json({
      message: 'Account has been created successfully',
      result: new ResUser(result),
      statusCode: HttpStatus.CREATED,
    });
  }

  @Public()
  @Post('login')
  async login(@Res() response: Response, @Body() loginDto: LoginDto) {
    const objWithAccessToken = await this.authService.login(loginDto);
    return response.status(HttpStatus.OK).json({
      message: 'Login completed successfully',
      result: objWithAccessToken,
      statusCode: HttpStatus.OK,
    });
  }

  @Get('me')
  getMe(@Res() response: Response, @Req() request: RequestWithUser) {
    return response.status(HttpStatus.OK).json({
      message: 'OK',
      result: new ResUser(request.user),
      statusCode: HttpStatus.OK,
    });
  }
}
