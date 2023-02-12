import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserHelperService } from 'src/app/shared/helper-service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
import { Wallet } from 'src/app/shared/models';
import { WalletService } from 'src/app/shared/services';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
})
export class WalletFormComponent {
  isLoading: boolean = false;
  wallet: Wallet = {
    userId: 0,
    name: '',
    currency: '',
  };
  updateSelectedWallet: boolean = false;

  constructor(
    private walletService: WalletService,
    private userHelperService: UserHelperService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) {
    this.userHelperService.getUserId().subscribe({
      next: (userId: number) => {
        if (userId) {
          this.wallet.userId = userId;
        }
      },
    });
  }

  upsertWallet = (): void => {
    this.isLoading = true;
    this.walletService
      .upsertWallet(this.wallet)
      .pipe(take(1))
      .subscribe({
        next: (response: Wallet) => {
          if (!this.updateSelectedWallet) {
            this.toastr.success(`${response.name} has been added`, `Success`);
          }
          this.setWalletModelToEmpty();
          this.isLoading = false;
          this.modalService.closeModal();
          this.updateSelectedWallet = false;
        },
        error: () => {
          this.toastr.warning(`Error adding wallet`, `Error`);
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
}
