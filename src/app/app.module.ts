import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './section/header/header.component';
import { FooterComponent } from './section/footer/footer.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { ListComponent } from './transaction/list/list.component';
import { FloatButtonComponent } from './shared/components/float-button/float-button.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CashflowStatementComponent } from './transaction/cashflow-statement/cashflow-statement.component';
import { WalletComponent } from './wallet/wallet.component';
import { ModalWrapperComponent } from './shared/components/modal-wrapper/modal-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TransactionFormComponent,
    ListComponent,
    FloatButtonComponent,
    LoginComponent,
    RegisterComponent,
    CashflowStatementComponent,
    WalletComponent,
    ModalWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
