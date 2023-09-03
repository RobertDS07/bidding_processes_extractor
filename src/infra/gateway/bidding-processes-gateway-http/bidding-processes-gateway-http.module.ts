import { Module } from '@nestjs/common';
import BiddingProcessGateway from 'src/application/gateway/bidding-process-gateway';
import HttpClientModule from 'src/infra/http/http-client/http-client.module';
import BiddingProcessGatewayHttp from './bidding-processes-gateway-http';

@Module({
  imports: [HttpClientModule],
  providers: [
    {
      provide: BiddingProcessGateway,
      useClass: BiddingProcessGatewayHttp,
    },
  ],
  exports: [BiddingProcessGateway],
})
export default class BiddingProcessGatewayHttpModule {}
