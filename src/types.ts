export interface PaymentRequest {
  service: string;
  amount: bigint;
  timestamp: bigint;
  chainId: bigint;
  nonce?: bigint;
}
