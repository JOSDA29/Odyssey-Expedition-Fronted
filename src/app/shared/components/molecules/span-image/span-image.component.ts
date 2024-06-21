import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-span-image',
  templateUrl: './span-image.component.html',
  styleUrl: './span-image.component.scss'
})
export class SpanImageComponent {
@Input() src:string = '';
@Input() alt: string = '';
@Input() text: string = '';
}
