import { Wallet } from './wallet.model';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  wallets?: Wallet[];
}
