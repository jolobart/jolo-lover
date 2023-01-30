import { Component, EventEmitter, Output } from '@angular/core';
import { ModalTitle } from '../../constants/modal-title.constant';
import { ComponentType } from '../../enums';
import { ModalWrapperDetails } from '../../models';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss'],
})
export class FloatButtonComponent {
  @Output() selectedComponent: EventEmitter<ModalWrapperDetails> =
    new EventEmitter<ModalWrapperDetails>();
  modalWrapperDetails: ModalWrapperDetails;

  onClick = (): void => {
    this.modalWrapperDetails = {
      title: ModalTitle.AddTransaction,
      componentType: ComponentType.TransactionForm,
    };

    this.selectedComponent.emit(this.modalWrapperDetails);
  };
}
