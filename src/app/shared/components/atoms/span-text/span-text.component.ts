import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-span-text',
  templateUrl: './span-text.component.html',
  styleUrl: './span-text.component.scss'
})
export class SpanTextComponent {
@Input() text:string = '';
}
