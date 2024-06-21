import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
@Input() text:string = '';
@Input() href:string = '';
@Input() style: 'info-normal' | 'link-normal' = 'info-normal';
@Input() isSelected: boolean = false;

}
