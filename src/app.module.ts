import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/module';
import { AuthModule } from './auth/module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard';

@Module({
  imports: [MoviesModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
