import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
@Input() text: string = '';
@Input() style: 'text-normal' | 'text-link' | 'text-secundary' | 'info-normal' = 'text-normal';
}
