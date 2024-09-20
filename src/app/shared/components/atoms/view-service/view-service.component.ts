import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.scss'
})
export class ViewServiceComponent {
 @Input() text: string = '';
}
