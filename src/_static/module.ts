import { Module } from '@nestjs/common';
import { StaticService } from './service';

@Module({
  providers: [StaticService],
  exports: [StaticService],
})
export class StaticModule {}
