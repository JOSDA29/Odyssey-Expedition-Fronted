import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
@Input() style: 'line-title-section' = 'line-title-section';
}
