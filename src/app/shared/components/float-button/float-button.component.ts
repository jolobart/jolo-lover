import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentType } from '../../enums/component-type.enum';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss']
})
export class FloatButtonComponent {
  @Output() selectedComponent: EventEmitter<string> = new EventEmitter<string>();

  onClick = (): void => {
    this.selectedComponent.emit(ComponentType.TransactionForm);
  }
}
