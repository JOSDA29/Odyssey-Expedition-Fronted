import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-hotel',
  templateUrl: './card-hotel.component.html',
  styleUrls: ['./card-hotel.component.scss']
})
export class CardHotelComponent implements OnInit {
  @Input() price: number = 600000;
  @Input() departure: string = '';
  @Input() type: string = '';
  @Input() desde: string = 'Desde';
  @Input() noches: string = 'Alojamiento';
  @Input() service: string = '';
  @Input() cant: string = 'persona';
  @Input() title: string = 'Four Seasons Hotel Casa Medina';
  @Input() src: string | undefined = '';

  defaultImage: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png';

  ngOnInit() {
    if (!this.src) {
      this.src = this.defaultImage;
    }
  }
}
