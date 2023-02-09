import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { COMPONENT_TYPES } from '../../constants';
import { ModalWrapperDetails } from '../../models';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent implements AfterViewInit, OnInit {
  @ViewChild('exampleModal') modal: ElementRef;
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Input() modalWrapperDetails: ModalWrapperDetails;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: ModalService
  ) {
    this.modalService.setModal(this.modal);
  }
  
  ngOnInit(): void {
    this.modalService.setModal(this.modal);
  }

  ngOnChanges(): void {
    this.upsertComponent(
      COMPONENT_TYPES[this.modalWrapperDetails.componentType]
    );
    this.modalService.setModal(this.modal);
  }

  ngAfterViewInit(): void {
    this.upsertComponent(
      COMPONENT_TYPES[this.modalWrapperDetails.componentType]
    );
    this.modalService.setModal(this.modal);
  }

  upsertComponent = (componentClass: any): void => {
    // Creates a component dynamically inside the ng-template
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(componentClass);
      this.cdRef.detectChanges();
    }
  };
}
