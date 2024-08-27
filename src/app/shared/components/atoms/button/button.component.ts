import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
@Input() text:string = '';
@Input() type: string = '';
@Input() style:'share-button' | 'saveHotel' |'button-Admin' | 'button-disaible' | 'search-button' | 'disaible-button' | 'button-cancel' | 'other-button' | 'registerGoogle' = 'share-button';
@Input() isSelected: boolean = false;
@Input() disabled: boolean = false;
}
