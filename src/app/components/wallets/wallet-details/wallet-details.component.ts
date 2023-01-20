import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentType } from 'src/app/shared/enums';
import { Wallet } from 'src/app/shared/models';

@Component({
  selector: 'wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss'],
})
export class WalletDetailsComponent {
  @Output() selectedWalletEvent: EventEmitter<ComponentType> =
    new EventEmitter<ComponentType>();

  isVisible: boolean = true;
  selectedWallet: Wallet = {
    id: 1,
    userId: 1,
    name: 'Personal',
    balance: 487,
    currency: 'PHP',
  };

  onClick = (): void => {
    this.selectedWalletEvent.emit(ComponentType.WalletList);
  };
}
