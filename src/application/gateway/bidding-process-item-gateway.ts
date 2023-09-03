interface getByBiddingProcessIdOutput {
  biddingProcessId: string;
  quantity: number;
  referenceValue: number;
  description: string;
  participationCode: number;
  code: number;
}

export default abstract class BiddingProcessItemGateway {
  abstract getByBiddingProcessId: () => Promise<getByBiddingProcessIdOutput>;
}
