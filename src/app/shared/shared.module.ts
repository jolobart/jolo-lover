import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { FooterComponent } from '../section/footer/footer.component';
import { HeaderComponent } from '../section/header/header.component';
import { CashflowStatementComponent } from '../transaction/cashflow-statement/cashflow-statement.component';
import { ListComponent } from '../transaction/list/list.component';
import { TransactionFormComponent } from '../transaction/transaction-form/transaction-form.component';
import { WalletDetailsComponent } from '../wallets/wallet/wallet-details.component';

import { FloatButtonComponent, ModalWrapperComponent } from './components';

export const components = [
  FloatButtonComponent,
  ModalWrapperComponent,
  HeaderComponent,
  FooterComponent,
  TransactionFormComponent,
  ListComponent,
  LoginComponent,
  RegisterComponent,
  CashflowStatementComponent,
  WalletDetailsComponent,
];

export const importModules = [CommonModule, FormsModule];

export const exportModules = [FormsModule];

@NgModule({
  declarations: [...components],
  entryComponents: [],
  imports: [...importModules],
  providers: [],
  exports: [...components, ...exportModules],
})
export class SharedModule {}
