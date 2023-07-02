import { Controller, Body, Post, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './service';
import { RequestWithUser } from './request-with-user';
import { ResponseWithEnvelope } from './middleware.envelope';
import { Public } from './decorator.public-route';
import * as RC from './dto.in.1.from.request';
import { GetMeCSdto } from './dto.in.2.from.controller';
import * as CR from './dto.out.to.response';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiResponse({ status: 200, type: CR.LoginCRdto })
  @ApiResponse({ status: 401, type: CR.UnauthorizedExceptionCRdto })
  async login(
    @Res() response: ResponseWithEnvelope,
    @Body() loginRCSdto: RC.LoginRCSdto,
  ) {
    const AccessToken = await this.authService.login(loginRCSdto);
    if (!AccessToken) {
      return response.envelope(new CR.UnauthorizedExceptionCRdto());
    }
    return response.envelope(new CR.LoginCRdto(AccessToken));
  }

  @Public()
  @Post('sign-up')
  @ApiResponse({ status: 201, type: CR.SignUpCRdto })
  @ApiResponse({ status: 400, type: CR.BadRequestExceptionCRdto })
  async signUp(
    @Res() response: ResponseWithEnvelope,
    @Body() signUpRCSdto: RC.SignUpRCSdto,
  ) {
    const newUser = await this.authService.signUp(signUpRCSdto);
    if (!newUser) {
      return response.envelope(new CR.BadRequestExceptionCRdto());
    }
    return response.envelope(new CR.SignUpCRdto(newUser));
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CR.GetMeCRdto })
  @ApiResponse({ status: 401, type: CR.UnauthorizedExceptionCRdto })
  async getMe(
    @Req() request: RequestWithUser,
    @Res() response: ResponseWithEnvelope,
  ) {
    const getMeCSdto = new GetMeCSdto(request.user);
    const user = await this.authService.getMe(getMeCSdto);
    if (!user) {
      return response.envelope(new CR.UnauthorizedExceptionCRdto());
    }
    return response.envelope(new CR.GetMeCRdto(user));
  }
}
