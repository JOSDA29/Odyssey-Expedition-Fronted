import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
@Input() text:string = '';
@Input() style:'share-button' | 'search-button' = 'share-button';
@Input() isSelected: boolean = false;
}
