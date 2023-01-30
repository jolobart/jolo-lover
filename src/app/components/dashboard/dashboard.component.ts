import { Component, OnInit } from '@angular/core';
import { ModalTitle } from 'src/app/shared/constants/modal-title.constant';
import { ComponentType } from 'src/app/shared/enums';
import { ModalWrapperDetails, Transaction } from 'src/app/shared/models';
import { TransactionService } from 'src/app/shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'expense-tracker-webapp';
  componentName: ComponentType = ComponentType.TransactionForm;
  transactionList: Transaction[] = [];
  modalWrapperDetails: ModalWrapperDetails = {
    title: ModalTitle.Default,
    componentType: ComponentType.Default,
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getAllTransaction();
  }

  getAllTransaction = (): void => {
    this.transactionService
      .getAllTransactions()
      .subscribe((transactionList) => {
        this.transactionList = transactionList;
      });
  };

  setComponentName = (modalWrapperDetails: ModalWrapperDetails): void => {
    this.modalWrapperDetails = modalWrapperDetails;
  };
}
