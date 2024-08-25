import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-text',
  templateUrl: './error-text.component.html',
  styleUrl: './error-text.component.scss'
})
export class ErrorTextComponent {
  @Input() text: string = '';
  @Input() style: 'textError1' | 'textErrorSheart' | 'textError2' = 'textError1';

}
