import { Module } from '@nestjs/common';
import DatabaseModule from 'src/infra/database/database.module';
import BoostBiddingProcessesController from './boost-bidding-processes.controller';
import UpdateBiddingProcesses from 'src/application/use-cases/update-bidding-processes';
import BiddingProcessGatewayHttpModule from 'src/infra/gateway/bidding-processes-gateway-http/bidding-processes-gateway-http.module';
import { RedisModule } from 'src/infra/redis/redis.module';

@Module({
  imports: [DatabaseModule, BiddingProcessGatewayHttpModule, RedisModule],
  controllers: [BoostBiddingProcessesController],
  providers: [UpdateBiddingProcesses],
})
export default class BoostBiddingProcessesModule {}
