import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { COMPONENT_TYPES } from '../../constants';
import { ComponentType } from '../../enums';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent implements AfterViewInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Input() componentName: ComponentType;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    console.log(this.componentName);
    this.addComponent(COMPONENT_TYPES[this.componentName]);
    // this.addComponent(ListComponent);
  }

  addComponent = (componentClass: any): void => {
    // Creates a component dynamically inside the ng-template
    this.viewContainerRef.createComponent(componentClass);
    this.cdRef.detectChanges();
  };

  removeComponent = (): void => {
    console.log('clicked');
    this.viewContainerRef.clear();
  };
}
