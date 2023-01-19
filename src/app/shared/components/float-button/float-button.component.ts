import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentType } from '../../enums';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss'],
})
export class FloatButtonComponent {
  @Output() selectedComponent: EventEmitter<ComponentType> =
    new EventEmitter<ComponentType>();

  onClick = (): void => {
    this.selectedComponent.emit(ComponentType.TransactionForm);
  };
}
