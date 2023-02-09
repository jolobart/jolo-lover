import { Component, EventEmitter, Output } from '@angular/core';
import { ModalTitle } from 'src/app/shared/constants/modal-title.constant';
import { ComponentType } from 'src/app/shared/enums';
import { ModalWrapperDetails, Wallet } from 'src/app/shared/models';

@Component({
  selector: 'wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss'],
})
export class WalletDetailsComponent {
  @Output() selectedWalletEvent: EventEmitter<ModalWrapperDetails> =
    new EventEmitter<ModalWrapperDetails>();
  modalWrapperDetails: ModalWrapperDetails;
  isVisible: boolean = true;
  selectedWallet: Wallet = {
    id: 1,
    userId: 1,
    name: 'Personal',
    balance: 487,
    currency: 'PHP',
  };

  viewWalletList = (): void => {
    this.modalWrapperDetails = {
      title: ModalTitle.SelectWallet,
      componentType: ComponentType.WalletList,
    };
    this.selectedWalletEvent.emit(this.modalWrapperDetails);
  };

  viewWalletForm = (): void => {
    this.modalWrapperDetails = {
      title: ModalTitle.AddWallet,
      componentType: ComponentType.WalletForm,
    };
    this.selectedWalletEvent.emit(this.modalWrapperDetails);
  };
}
