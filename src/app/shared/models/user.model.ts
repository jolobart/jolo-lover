import { Wallet } from './wallet.model';

export interface User {
  id?: number;
  name: string;
  email: string;
  selectedWalletId?: number;
  password?: string;
  wallets?: Wallet[];
}
