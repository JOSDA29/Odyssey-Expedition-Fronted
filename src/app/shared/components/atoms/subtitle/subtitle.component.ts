import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  templateUrl: './subtitle.component.html',
  styleUrl: './subtitle.component.scss'
})
export class SubtitleComponent {
@Input() text:string = '';
@Input() style: 'subtitle-principal' | 'subtitle-secundary' = 'subtitle-principal'
}
