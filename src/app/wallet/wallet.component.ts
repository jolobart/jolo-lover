import { Component } from '@angular/core';
import { Wallet } from '../shared/models/wallet.model';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  isVisible: boolean = true;
  selectedWallet: Wallet = {
    id: 1,
    userId: 1,
    name: "Personal",
    balance: 487,
    currency: "PHP"
  };
}
