import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-hotel',
  templateUrl: './card-hotel.component.html',
  styleUrl: './card-hotel.component.scss'
})
export class CardHotelComponent {
  @Input() price:number = 600000;
  @Input() departure:string = '';
  @Input() service: string = '';
  @Input() cant:string = 'persona';
  @Input() title:string = 'Four Seasons Hotel Casa Medina';
  @Input() src:string | undefined = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png';
}
