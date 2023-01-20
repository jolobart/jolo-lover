import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FloatButtonComponent, ModalWrapperComponent } from './components';

import {
  CashflowStatementComponent,
  FooterComponent,
  HeaderComponent,
  LoginComponent,
  RegisterComponent,
  TransactionFormComponent,
  TransactionListComponent,
  WalletDetailsComponent,
  WalletListComponent
} from '../components';

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
export class SharedModule { }
