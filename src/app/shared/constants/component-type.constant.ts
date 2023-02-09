import {
  TransactionFormComponent,
  WalletListComponent,
} from 'src/app/components';
import { WalletFormComponent } from 'src/app/components/wallets/wallet-form/wallet-form/wallet-form.component';
import { ComponentType } from '../enums';

export const COMPONENT_TYPES: Record<any, any> = {
  [ComponentType.TransactionForm]: TransactionFormComponent,
  [ComponentType.WalletList]: WalletListComponent,
  [ComponentType.WalletForm]: WalletFormComponent,
};
