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

  ngOnChanges(): void {
    this.upsertComponent(COMPONENT_TYPES[this.componentName]);
  }

  ngAfterViewInit(): void {
    this.upsertComponent(COMPONENT_TYPES[this.componentName]);
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
