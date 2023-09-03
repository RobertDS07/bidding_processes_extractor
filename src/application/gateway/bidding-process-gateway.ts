export interface GetBiddingProcessesFromNextThirtyDaysOrderedByPublishDateOutput {
  id: number;
  identification: string;
  number: string;
  summary: string;
  biddingSituationCode: number;
  statusCode: number;
  biddingStartDatetime: Date;
  publicationDate: Date;
}

export default abstract class BiddingProcessGateway {
  abstract getBiddingProcessesFromNextThirtyDaysOrderedByPublishDate: (
    page: number,
  ) => Promise<
    GetBiddingProcessesFromNextThirtyDaysOrderedByPublishDateOutput[]
  >;
}
