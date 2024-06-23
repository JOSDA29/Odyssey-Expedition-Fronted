import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
@Input() text:string = '';
@Input() style:'share-button' | 'search-button' | 'other-button' | 'registerGoogle' = 'share-button';
@Input() isSelected: boolean = false;
@Input() disabled: boolean = false;
}
