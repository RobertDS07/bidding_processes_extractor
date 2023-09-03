export interface BiddingProcess {
  id: number;
  identification: string;
  number: string;
  summary: string;
  biddingSituationCode: number;
  statusCode: number;
  biddingStartDatetime: Date;
  publicationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CreataInput = Pick<
  BiddingProcess,
  | 'id'
  | 'identification'
  | 'biddingSituationCode'
  | 'biddingStartDatetime'
  | 'number'
  | 'publicationDate'
  | 'statusCode'
  | 'summary'
>;

export type UpdateInput = Partial<
  Pick<
    BiddingProcess,
    | 'biddingSituationCode'
    | 'identification'
    | 'publicationDate'
    | 'biddingStartDatetime'
    | 'number'
    | 'statusCode'
    | 'summary'
  >
>;

export default abstract class BiddingProcessRepository {
  abstract create(input: CreataInput): Promise<void>;
  abstract getById(id: number): Promise<BiddingProcess>;
  abstract updateById(id: number, input: UpdateInput): Promise<void>;
  abstract cascadeDeleteBetweenDates(
    startDate: Date,
    endDate: Date,
  ): Promise<void>;
}
