import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
@Input() text: string = '';
@Input() style:'status-principal' | 'status-secondary' = 'status-principal'
}
