import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  FloatButtonComponent,
  ModalWrapperComponent,
  SpinnerComponent,
  ToasterComponent,
} from './components';

import {
  CashflowStatementComponent,
  FooterComponent,
  HeaderComponent,
  LoginComponent,
  RegisterComponent,
  TransactionFormComponent,
  TransactionListComponent,
  WalletDetailsComponent,
  WalletListComponent,
} from '../components';

import { AuthGuard } from './guards';

export const components = [
  FloatButtonComponent,
  ModalWrapperComponent,
  HeaderComponent,
  FooterComponent,
  TransactionFormComponent,
  TransactionListComponent,
  WalletListComponent,
  LoginComponent,
  RegisterComponent,
  CashflowStatementComponent,
  WalletDetailsComponent,
  SpinnerComponent,
  ToasterComponent,
];

export const providers = [AuthGuard];

export const importModules = [CommonModule, FormsModule, RouterModule];

export const exportModules = [FormsModule];

@NgModule({
  declarations: [...components],
  entryComponents: [],
  imports: [...importModules],
  providers: [...providers],
  exports: [...components, ...exportModules],
})
export class SharedModule {}
