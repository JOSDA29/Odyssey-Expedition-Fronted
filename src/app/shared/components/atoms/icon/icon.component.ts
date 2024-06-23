import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
@Input() src:string = '';
@Input() alt:string = '';
@Input() href:string = '';

@Input() style: 'primary' | 'icons-top-nab-bar' | 'shared-icon' | 'profile' | 'icon-text'= 'primary';

}
