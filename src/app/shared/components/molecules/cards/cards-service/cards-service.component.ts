import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-service',
  templateUrl: './cards-service.component.html',
  styleUrl: './cards-service.component.scss'
})
export class CardsServiceComponent {
@Input() price:number = 0;
@Input() departure:string = '';
@Input() cant:string = '';
@Input() title:string = '';
@Input() src:string = '';

}
