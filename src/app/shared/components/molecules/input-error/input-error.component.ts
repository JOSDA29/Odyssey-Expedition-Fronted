import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss'
})
export class InputErrorComponent {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() errors: { [key: string]: string } = {};

  getErrorText(): string {
    if (this.control.errors) {
      const errorKey = Object.keys(this.control.errors)[0];
      return this.errors[errorKey] || 'Error';
    }
    return '';
  }
}
