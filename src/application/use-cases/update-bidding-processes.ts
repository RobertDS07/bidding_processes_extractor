import { Injectable } from '@nestjs/common';
import BiddingProcessRepository from '../repository/bidding-process-repository';
import BiddingProcessGateway, {
  GetBiddingProcessesFromNextThirtyDaysOrderedByPublishDateOutput,
} from '../gateway/bidding-process-gateway';
import { Cache } from '../cache/cache';
import { ObjectComparator } from 'src/domain/object-comparator';
import UpdateBiddingIsExecutingError from 'src/domain/errors/update-bidding-is-executing-error';

@Injectable()
export default class UpdateBiddingProcesses {
  private objectComparator: ObjectComparator;

  constructor(
    private readonly biddingProcessRepository: BiddingProcessRepository,
    private readonly biddingProcessGateway: BiddingProcessGateway,
    private readonly cache: Cache,
  ) {
    this.objectComparator = new ObjectComparator();
  }

  private async handleUpdateBiddingProcesses(
    biddingProcessesFromGateway: GetBiddingProcessesFromNextThirtyDaysOrderedByPublishDateOutput[],
  ) {
    const cloneProcesses = [...biddingProcessesFromGateway];

    while (cloneProcesses.length > 0) {
      const currentProcess = cloneProcesses.shift();

      const currentProcessInOurDatabase =
        await this.biddingProcessRepository.getById(currentProcess.id);

      if (!currentProcessInOurDatabase) {
        await this.biddingProcessRepository.create({
          id: currentProcess.id,
          identification: currentProcess.identification,
          biddingSituationCode: currentProcess.biddingSituationCode,
          publicationDate: currentProcess.publicationDate,
          biddingStartDatetime: currentProcess.biddingStartDatetime,
          number: currentProcess.number,
          statusCode: currentProcess.statusCode,
          summary: currentProcess.summary,
        });
      } else {
        const diffToUpdate = this.objectComparator.getDiffFrom<
          typeof currentProcess
        >(
          {
            id: currentProcessInOurDatabase.id,
            identification: currentProcessInOurDatabase.identification,
            number: currentProcessInOurDatabase.number,
            publicationDate: currentProcessInOurDatabase.publicationDate,
            summary: currentProcessInOurDatabase.summary,
            statusCode: currentProcessInOurDatabase.statusCode,
            biddingSituationCode:
              currentProcessInOurDatabase.biddingSituationCode,
            biddingStartDatetime:
              currentProcessInOurDatabase.biddingStartDatetime,
          },
          currentProcess,
        );

        if (diffToUpdate) {
          await this.biddingProcessRepository.updateById(
            currentProcessInOurDatabase.id,
            diffToUpdate,
          );
        }
      }

      const nextProcess = cloneProcesses[0];
      if (nextProcess) {
        await this.biddingProcessRepository.cascadeDeleteBetweenDates(
          currentProcess.publicationDate,
          nextProcess.publicationDate,
        );
      }
    }
  }

  private async handleGetAndUpdateBiddingProcesses(pageToFindMore: number) {
    const gatewayBiddingProcesses =
      await this.biddingProcessGateway.getBiddingProcessesFromNextThirtyDaysOrderedByPublishDate(
        pageToFindMore,
      );

    const hasBiddingProcessesToHandle = gatewayBiddingProcesses.length > 0;
    if (!hasBiddingProcessesToHandle) return;

    await this.handleUpdateBiddingProcesses(gatewayBiddingProcesses);

    return this.handleGetAndUpdateBiddingProcesses(pageToFindMore + 1);
  }

  async execute(): Promise<void> {
    const isExecuting = await this.cache.updateBiddingIsExecuting();
    const isExecutingItems = await this.cache.updateBiddingItemsIsExecuting();
    if (isExecuting || isExecutingItems) {
      throw new UpdateBiddingIsExecutingError(
        'Update of bidding processes is already executing',
      );
    }

    await this.cache.setUpdateBiddingIsExecuting(true);
    try {
      await this.handleGetAndUpdateBiddingProcesses(1);
    } catch (e) {
      throw e;
    } finally {
      await this.cache.setUpdateBiddingIsExecuting(false);
    }
  }
}
