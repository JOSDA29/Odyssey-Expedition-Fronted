import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-text',
  templateUrl: './icon-text.component.html',
  styleUrl: './icon-text.component.scss'
})
export class IconTextComponent {
@Input() src:string = '';
@Input() alt:string = '';
@Input() text:string = '';


}
