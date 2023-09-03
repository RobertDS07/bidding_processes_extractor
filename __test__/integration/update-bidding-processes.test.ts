import flushDatabase from '../utils/flush-database';

describe('update bidding processes test', () => {
  beforeEach(async () => {});

  afterEach(async () => {
    await flushDatabase();
  });

  it('should create biddings process with new data from bidding process gateway', async () => {});

  it('should set true in cache if start execution', async () => {});

  it('should not start execution if is true in cache', async () => {});

  it('should update biddings process with new data from bidding process gateway', async () => {});

  it('should delete biddings process that is not in new data from bidding process gateway', async () => {});

  it('should throw error and rollback in transaction if any error occur', async () => {});

  it('should throw error if a update process already occurring', async () => {});
});
