import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-input-text',
  templateUrl: './image-input-text.component.html',
  styleUrl: './image-input-text.component.scss'
})
export class ImageInputTextComponent {
  @Input() type: string = '';
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() placeholder: string = '';

  @Input() styleinput: 'input-text' | 'input-number' | 'input-register' = 'input-text';
}
