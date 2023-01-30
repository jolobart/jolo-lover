import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { COMPONENT_TYPES } from '../../constants';
import { ModalWrapperDetails } from '../../models';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent implements AfterViewInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Input() modalWrapperDetails: ModalWrapperDetails;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.upsertComponent(
      COMPONENT_TYPES[this.modalWrapperDetails.componentType]
    );
  }

  ngAfterViewInit(): void {
    this.upsertComponent(
      COMPONENT_TYPES[this.modalWrapperDetails.componentType]
    );
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
