import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from '../_users/module';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './jwt.constants';
import { AuthService } from './service';
import { AuthController } from './controller';
import { addEnvelope } from './middleware.envelope';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: secret,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(addEnvelope).forRoutes('*');
  }
}
