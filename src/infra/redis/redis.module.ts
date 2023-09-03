import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { Cache } from 'src/application/cache/cache';

@Module({
  providers: [
    {
      provide: Cache,
      useClass: RedisService,
    },
  ],
  exports: [Cache],
})
export class RedisModule {}
