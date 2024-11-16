export interface PaymentRequest {
  service: `0x${string}`;
  amount: string;
  userAddress: `0x${string}`;
  chainId: string;
  nonce?: string;
}
