import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TitleComponent {
  @Input() text: string = '';
  @Input() style: 'title-principal' | 'state-Tables' | 'titleTableAdmin' | 'titleIA' | 'title-third2' | 'title-nosotros-profile' | 'title-secondary' | 'title-third' = 'title-principal';
}
