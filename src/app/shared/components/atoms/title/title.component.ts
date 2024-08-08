import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
@Input() text:string = '';
@Input() style: 'title-principal' | 'titleIA' | 'title-third2' | 'title-nosotros-profile' | 'title-secondary' | 'title-third' = 'title-principal';
}
