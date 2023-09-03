import BiddingProcessRepository, {
  BiddingProcess,
  CreataInput,
  UpdateInput,
} from 'src/application/repository/bidding-process-repository';
import PrismaService from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class BiddingProcessRepositoryPrisma
  implements BiddingProcessRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreataInput): Promise<void> {
    await this.prismaService.biddingProcess.create({ data: input });
  }

  async getById(id: number): Promise<BiddingProcess> {
    const row = await this.prismaService.biddingProcess.findUnique({
      where: { id },
    });
    if (!row) return null;
    return {
      id: row.id,
      identification: row.identification,
      number: row.number,
      summary: row.summary,
      statusCode: row.statusCode,
      publicationDate: row.publicationDate,
      biddingSituationCode: row.biddingSituationCode,
      biddingStartDatetime: row.biddingStartDatetime,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  async updateById(id: number, input: UpdateInput): Promise<void> {
    await this.prismaService.biddingProcess.update({
      where: { id },
      data: input,
    });
  }

  async cascadeDeleteBetweenDates(
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const biddingProcessesToDelete =
      await this.prismaService.biddingProcess.findMany({
        where: {
          publicationDate: {
            gt: startDate,
            lt: endDate,
          },
        },
      });
    const hasProcess = biddingProcessesToDelete.length > 0;
    if (!hasProcess) {
      return null;
    }
    const biddingProcessesIds = biddingProcessesToDelete.map(
      (process) => process.id,
    );
    const deleteItems = this.prismaService.biddingProcessItem.deleteMany({
      where: {
        biddingProcessId: {
          in: biddingProcessesIds,
        },
      },
    });
    const deleteProcesses = this.prismaService.biddingProcess.deleteMany({
      where: {
        id: {
          in: biddingProcessesIds,
        },
      },
    });
    await this.prismaService.$transaction([deleteItems, deleteProcesses]);
  }
}
