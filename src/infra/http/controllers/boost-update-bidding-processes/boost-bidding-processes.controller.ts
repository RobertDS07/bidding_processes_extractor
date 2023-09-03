import {
  Controller,
  InternalServerErrorException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import UpdateBiddingProcesses from 'src/application/use-cases/update-bidding-processes';
import UpdateBiddingIsExecutingError from 'src/domain/errors/update-bidding-is-executing-error';

@Controller('boost/bidding-processes')
export default class BoostBiddingProcessesController {
  constructor(
    private readonly updateBiddingProcessesUsecase: UpdateBiddingProcesses,
  ) {}

  @Post()
  async boostUpdateBiddingProcesses(): Promise<void> {
    try {
      await this.updateBiddingProcessesUsecase.execute();
    } catch (e) {
      // capture on sentry, logs, etc...

      if (e instanceof UpdateBiddingIsExecutingError) {
        throw new UnprocessableEntityException(
          'Processo de atualização de processos já esta sendo executado.',
        );
      }

      throw new InternalServerErrorException(
        'Erro ao atualizar os processos licitatórios',
      );
    }
  }
}
