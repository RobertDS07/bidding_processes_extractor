import { Module } from '@nestjs/common';
import PrismaService from './prisma/prisma.service';
import BiddingProcessRepository from 'src/application/repository/bidding-process-repository';
import BiddingProcessRepositoryPrisma from './prisma/repositories/bidding-process-repository-prisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: BiddingProcessRepository,
      useClass: BiddingProcessRepositoryPrisma,
    },
  ],
  exports: [BiddingProcessRepository],
})
export default class DatabaseModule {}
