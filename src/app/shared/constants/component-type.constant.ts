import { TransactionFormComponent, WalletListComponent } from 'src/app/components';
import { ComponentType } from '../enums';

export const COMPONENT_TYPES: Record<any, any> = {
  [ComponentType.TransactionForm]: TransactionFormComponent,
  [ComponentType.WalletList]: WalletListComponent,
};
