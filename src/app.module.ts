import { Module } from '@nestjs/common';
import DatabaseModule from './infra/database/database.module';
import ControllersModule from './infra/http/controllers/controllers.module';
import HttpClientModule from './infra/http/http-client/http-client.module';
import { RedisModule } from './infra/redis/redis.module';

@Module({
  imports: [DatabaseModule, ControllersModule, HttpClientModule, RedisModule],
})
export class AppModule {}
