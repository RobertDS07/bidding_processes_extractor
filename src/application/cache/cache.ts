export abstract class Cache {
  abstract get(key: string): Promise<string | null>;
  abstract set(key: string, value: string): Promise<void>;
  abstract updateBiddingIsExecuting(): Promise<boolean>;
  abstract setUpdateBiddingIsExecuting(isExecuting: boolean): Promise<void>;
  abstract updateBiddingItemsIsExecuting(): Promise<boolean>;
  abstract setUpdateBiddingItemsIsExecuting(
    isExecuting: boolean,
  ): Promise<void>;
}
