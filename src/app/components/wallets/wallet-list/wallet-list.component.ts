import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserHelperService } from 'src/app/shared/helper-service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
import {
  ModalWrapperDetails,
  RemoveWalletRequest,
  SelectWalletRequest,
  User,
  Wallet,
} from 'src/app/shared/models';
import { WalletService } from 'src/app/shared/services';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss'],
})
export class WalletListComponent implements OnInit {
  @Output() selectedWalletEvent: EventEmitter<ModalWrapperDetails> =
    new EventEmitter<ModalWrapperDetails>();
  isEdit: boolean = false;
  modalWrapperDetails: ModalWrapperDetails;
  wallets: Wallet[];
  selectedWalletId: number;
  selectedWallet: Wallet;
  user: User;
  isLoading = false;
  selectWalletRequest: SelectWalletRequest = {
    userId: 0,
    walletId: 0,
  };
  wallet: Wallet = {
    id: 0,
    userId: 0,
    name: '',
    balance: 0,
    currency: '',
  };
  removeWalletRequest: RemoveWalletRequest = {
    id: 0,
    userId: 0,
  };

  constructor(
    private walletService: WalletService,
    private userHelperService: UserHelperService,
    private toastr: ToastrService,
    private walletHelperService: WalletHelperService,
    private modalService: ModalService
  ) {
    this.userHelperService.getUser().subscribe({
      next: (user: User) => {
        if (user) {
          this.user = user;
          this.selectedWalletId = user.selectedWalletId as number;
        }
      },
    });

    this.walletHelperService.getWallet().subscribe({
      next: (wallet: Wallet) => {
        if (wallet) {
          this.selectWalletId(wallet);
        }
      },
    });
  }

  ngOnInit(): void {
    this.getUserById(this.user.id as number);
  }

  getUserById = (id: number): void => {
    this.walletService
      .getWalletList(id)
      .pipe(take(1))
      .subscribe({
        next: (response: Wallet[]) => {
          this.wallets = response;
        },
      });
  };

  selectWalletId = (wallet: Wallet): void => {
    this.selectedWalletId = wallet.id as number;
    this.selectedWallet = wallet;
  };

  selectWallet = (): void => {
    this.isLoading = true;
    this.selectWalletRequest.userId = this.user.id as number;
    this.selectWalletRequest.walletId = this.selectedWalletId;
    this.walletService
      .selectWallet(this.selectWalletRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: Wallet) => {
          this.selectWalletId(response);
          this.toastr.success(`${response.name} selected`, 'Success!');
          this.walletHelperService.setWallet(response);
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        },
      });
  };

  viewWalletForm = (wallet: Wallet): void => {
    this.isEdit = true;
    this.wallet = wallet;
  };

  cancelEdit = (): void => {
    this.isEdit = false;
  };

  upsertWallet = (): void => {
    this.isLoading = true;
    this.walletService
      .upsertWallet(this.wallet)
      .pipe(take(1))
      .subscribe({
        next: (response: Wallet) => {
          this.toastr.success(`${response.name} has been update`, `Success`);
          this.setWalletModelToEmpty();
          if (response.id === this.selectedWalletId) {
            this.walletHelperService.setWallet(response);
          }
          this.isLoading = false;
          this.isEdit = false;
          this.modalService.closeModal();
        },
        error: () => {
          this.toastr.warning(`Error updating wallet`, `Error`);
          this.isLoading = false;
        },
      });
  };

  removeWallet = (wallet: Wallet): void => {
    this.walletService
      .removeWallet(wallet.id as number)
      .pipe(take(1))
      .subscribe({
        next: (response: Wallet) => {
          this.toastr.success(`${response.name} has been deleted`, `Success`);
          this.filterWallet(response.id as number);
        },
        error: () => {
          this.toastr.warning(`Error deleting wallet`, `Error`);
          this.isLoading = false;
        },
      });
  };

  setWalletModelToEmpty = (): void => {
    this.wallet = {
      userId: 0,
      name: '',
      balance: 0,
      currency: '',
    };
  };

  filterWallet = (id: number): void => {
    this.wallets = this.wallets.filter((wallet) => wallet.id != id);
  };
}
