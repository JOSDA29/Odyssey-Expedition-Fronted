import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss'
})
export class InputErrorComponent {
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() type: string = 'text';
  @Input() errors: { [key: string]: string } = {};
  @Input() errorMessage: string = '';


  getErrorText(): string {
    if (this.errorMessage) {
      return this.errorMessage; 
    }
    if (this.control && this.control.errors) {
      for (const errorKey in this.errors) {
        if (this.control.errors[errorKey]) {
          return this.errors[errorKey];
        }
      }
    }
    return ''; 
  }
}
