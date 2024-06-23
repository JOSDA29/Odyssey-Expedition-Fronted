import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-normal',
  templateUrl: './link-normal.component.html',
  styleUrl: './link-normal.component.scss'
})
export class LinkNormalComponent {
  @Input() text:string = '';
  @Input() href:string = '';
  @Input() style:'link-normal-all' | 'text-link' = 'link-normal-all';
}
