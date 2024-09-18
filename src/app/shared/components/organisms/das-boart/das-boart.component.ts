import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-das-boart',
  templateUrl: './das-boart.component.html',
  styleUrl: './das-boart.component.scss'
})
export class DasBoartComponent {
  @Input() titlesTopTransport= [{title1:'Control y gestión de ventas', title2: ''} ];

}
