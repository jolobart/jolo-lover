import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalTitle } from 'src/app/shared/constants/modal-title.constant';
import { ComponentType } from 'src/app/shared/enums';
import { UserHelperService } from 'src/app/shared/helper-service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
import { ModalWrapperDetails, Wallet } from 'src/app/shared/models';
import { WalletService } from 'src/app/shared/services';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

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

  constructor(
    private walletService: WalletService,
    private userHelperService: UserHelperService,
    private toastr: ToastrService,
    private walletHelperService: WalletHelperService,
    private modalService: ModalService
  ) {
    this.walletHelperService.getWallet().subscribe({
      next: (wallet: Wallet) => {
        if (wallet) {
          this.selectedWallet = wallet;
        }
      },
    });
  }

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
    this.modalService.closeModal();
  };
}
