import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent {
  @Input() message: string;
  @Input() type: string;
  @Input() duration = 2000;
  show = false;

  showToaster = (): void => {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, this.duration);
  };
}
