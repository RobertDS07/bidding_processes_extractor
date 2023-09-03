import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { Cache } from 'src/application/cache/cache';

const UPDATE_BIDDING_PROCESSES_IS_EXECUTING_KEY =
  'update:bidding:processes:is:executing';
const UPDATE_BIDDING_PROCESS_ITEMS_IS_EXECUTING_KEY =
  'update:bidding:process:items:is:executing';

@Injectable()
export class RedisService implements OnModuleDestroy, Cache {
  redisClient: Redis;

  constructor() {
    const port = process.env.REDIS_PORT;
    const host = process.env.REDIS_HOST;
    this.redisClient = new Redis(+port, host);
  }

  async onModuleDestroy() {
    return new Promise((resolve) => this.redisClient.quit(resolve));
  }

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async updateBiddingIsExecuting(): Promise<boolean> {
    return (
      (await this.redisClient.get(
        UPDATE_BIDDING_PROCESSES_IS_EXECUTING_KEY,
      )) === 'true'
    );
  }

  async setUpdateBiddingIsExecuting(isExecuting: boolean): Promise<void> {
    await this.redisClient.set(
      UPDATE_BIDDING_PROCESSES_IS_EXECUTING_KEY,
      isExecuting ? 'true' : 'false',
    );
  }

  async updateBiddingItemsIsExecuting(): Promise<boolean> {
    return (
      (await this.redisClient.get(
        UPDATE_BIDDING_PROCESS_ITEMS_IS_EXECUTING_KEY,
      )) === 'true'
    );
  }

  async setUpdateBiddingItemsIsExecuting(isExecuting: boolean): Promise<void> {
    await this.redisClient.set(
      UPDATE_BIDDING_PROCESS_ITEMS_IS_EXECUTING_KEY,
      isExecuting ? 'true' : 'false',
    );
  }
}
