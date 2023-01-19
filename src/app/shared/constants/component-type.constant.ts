import { TransactionFormComponent } from 'src/app/transaction/transaction-form/transaction-form.component';
import { ListComponent } from 'src/app/wallets/list/list.component';
import { ComponentType } from '../enums';

export const COMPONENT_TYPES: Record<any, any> = {
  [ComponentType.TransactionForm]: TransactionFormComponent,
  [ComponentType.WalletList]: ListComponent,
};
