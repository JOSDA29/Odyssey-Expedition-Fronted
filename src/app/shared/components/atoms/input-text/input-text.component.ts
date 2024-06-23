import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() min: number = 1;

  @Input() style: 'input-text' | 'input-number' | 'input-register'  | 'input-register' = 'input-text';
}
