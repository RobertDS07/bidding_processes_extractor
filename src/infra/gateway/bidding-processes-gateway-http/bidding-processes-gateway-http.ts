import { Injectable } from '@nestjs/common';
import { GetBiddingProcessesFromNextThirtyDaysOrderedByPublishDateOutput } from 'src/application/gateway/bidding-process-gateway';
import HttpClient from '../../http/http-client/http-client';
import BiddingProcessGateway from 'src/application/gateway/bidding-process-gateway';
import { GetProcessosReturn } from './types/get-processos-return';

@Injectable()
export default class BiddingProcessGatewayHttp
  implements BiddingProcessGateway
{
  private readonly BASE_URL = process.env.PORTAL_DE_COMPRAS_API;

  constructor(private readonly httpClient: HttpClient) {}

  async getBiddingProcessesFromNextThirtyDaysOrderedByPublishDate(
    page: number,
  ): Promise<
    GetBiddingProcessesFromNextThirtyDaysOrderedByPublishDateOutput[]
  > {
    const response = await this.httpClient.get<GetProcessosReturn>(
      `${this.BASE_URL}/v2/licitacao/processos`,
      {
        pagina: page,
        filtroEspecial: 1,
        filtroOrdenacao: 1,
      },
    );
    const formattedData = response.result.map((process) => ({
      id: process.codigoLicitacao,
      identification: process.identificacao,
      number: process.numero,
      summary: process.resumo,
      statusCode: process.status.codigo,
      publicationDate: new Date(process.dataHoraPublicacao),
      biddingSituationCode: process.codigoSituacaoEdital,
      biddingStartDatetime: new Date(process.dataHoraInicioLances),
    }));
    return formattedData;
  }
}
