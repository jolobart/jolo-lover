import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: ElementRef;

  constructor() {}

  setModal(modal: ElementRef): void {
    this.modal = modal;
  }

  openModal(): void {
    this.modal.nativeElement.classList.add('show');
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    if (this.modal) {
      this.modal.nativeElement.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  }
}
