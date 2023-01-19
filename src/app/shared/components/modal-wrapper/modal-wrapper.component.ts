import { AfterViewInit, ChangeDetectorRef, Component, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { TransactionFormComponent } from 'src/app/transaction/transaction-form/transaction-form.component';
import { COMPONENT_TYPES } from '../../constants/component-type.constant';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements AfterViewInit {
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @Input() componentName: string = '';
  readonly componentMapping = COMPONENT_TYPES;
  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    // this.addComponent(this.componentMapping[this.componentName]);
  }

  addComponent = (componentClass: any): void => {
    // Creates a component dynamically inside the ng-template
    this.viewContainerRef.createComponent(componentClass);
    this.cdRef.detectChanges();
  }
}
