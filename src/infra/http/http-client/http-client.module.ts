import { Module } from '@nestjs/common';
import HttpClient from './http-client';
import AxiosAdapter from './axios-adapter';

@Module({
  providers: [
    {
      provide: HttpClient,
      useClass: AxiosAdapter,
    },
  ],
  exports: [HttpClient],
})
export default class HttpClientModule {}
