import { PaginateParams, Paginated } from './types/paginated';

interface FindOutput {
  id: string;
  number: string;
  summary: string;
  biddingSituationCode: number;
  statusCode: string;
  biddingStartDatetime: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindFilters {
  biddingStartDatetime?: Date;
  number?: string;
  summary?: string;
  itemDescription?: string;
}

export abstract class BiddingProcessQuery {
  abstract find(
    filters?: FindFilters,
    paginateParams?: PaginateParams,
  ): Promise<Paginated<FindOutput>>;
}
