import { Injectable } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class ModalControlService {
  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }
}
