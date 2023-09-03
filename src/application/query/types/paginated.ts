export type Paginated<T> = {
  count: number;
  data: T[];
};

export interface PaginateParams {
  skip: number;
  limit: number;
}
