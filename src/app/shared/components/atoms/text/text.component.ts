import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input() text: string = '';
  @Input() style: 'text-normal' | 'text-link' | 'text-secundary' | 'textError1' | 'textsecundary' | 'errortext' | 'errortext1' | 'textError2' | 'info-normal' = 'text-normal';
}
