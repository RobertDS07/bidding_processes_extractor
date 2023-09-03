interface BiddingProcessItem {
  biddingProcessId: string;
  quantity: number;
  referenceValue: number;
  description: string;
  participationCode: number;
  code: number;
  createdAt: Date;
  updatedAt: Date;
}

type CreataInput = Pick<
  BiddingProcessItem,
  | 'quantity'
  | 'referenceValue'
  | 'description'
  | 'participationCode'
  | 'code'
  | 'biddingProcessId'
>;

type UpdateInput = Partial<
  Pick<
    BiddingProcessItem,
    'quantity' | 'referenceValue' | 'description' | 'participationCode'
  >
>;

export default abstract class BiddingProcessItemRepository {
  abstract create(input: CreataInput): Promise<void>;
  abstract update(input: UpdateInput): Promise<void>;
}
