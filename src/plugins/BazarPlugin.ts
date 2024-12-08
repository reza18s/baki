import { registerPlugin } from '@capacitor/core';

interface PurchaseResult {
  orderId: string;
  purchaseToken: string;
  payload: string;
  packageName: string;
  purchaseState: 'PURCHASED' | 'REFUNDED';
  purchaseTime: number;
  productId: string;
  originalJson: string;
  dataSignature: string;
}

interface PurchaseOptions {
  productId: string;
  payload: string;
  dynamicPriceToken?: string;
}

export interface BazarPlugin {
  connect(): Promise<void>;
  startPayment(options: PurchaseOptions): Promise<PurchaseResult>;
  consumePurchase(options: { purchaseToken: string }): Promise<void>;
  getPurchaseHistory(): Promise<PurchaseResult[]>;
  addComment(): Promise<void>;
}

const BazarPlugin = registerPlugin<BazarPlugin>('Bazar');

export default BazarPlugin;
