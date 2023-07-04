import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { secret } from './jwt.constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorator.public-route';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './jwt.payload';
import { ResponseWithEnvelope } from './middleware.envelope';
import { UnauthorizedExceptionCRdto } from './dto.out.to.response';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response: ResponseWithEnvelope = context.switchToHttp().getResponse();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      response.envelope(new UnauthorizedExceptionCRdto());
      return false;
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
      request['user'] = payload;
    } catch {
      response.envelope(new UnauthorizedExceptionCRdto());
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
