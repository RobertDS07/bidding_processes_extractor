import { Module } from '@nestjs/common';
import BoostBiddingProcessesModule from './boost-update-bidding-processes/boost-bidding-processes.module';

@Module({
  imports: [BoostBiddingProcessesModule],
})
export default class ControllersModule {}
