import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserHelperService } from 'src/app/shared/helper-service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
import { SelectWalletRequest, User, Wallet } from 'src/app/shared/models';
import { WalletService } from 'src/app/shared/services';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss'],
})
export class WalletListComponent {
  wallets: Wallet[];
  selectedWalletId: number;
  selectedWallet: Wallet;
  user: User;
  selectWalletRequest: SelectWalletRequest = {
    userId: 0,
    walletId: 0,
  };

  constructor(
    private walletService: WalletService,
    private userHelperService: UserHelperService,
    private toastr: ToastrService,
    private walletHelperService: WalletHelperService,
    private cdRef: ChangeDetectorRef
  ) {
    this.userHelperService.getUser().subscribe({
      next: (user: User) => {
        if (user) {
          this.user = user;
          this.selectedWalletId = user.selectedWalletId as number;
          this.getUserById(user.id as number);
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
          // this.cdRef.detectChanges();
        },
      });
  };
}
