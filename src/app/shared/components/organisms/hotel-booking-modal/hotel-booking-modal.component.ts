import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hotel-booking-modal',
  templateUrl: './hotel-booking-modal.component.html',
  styleUrl: './hotel-booking-modal.component.scss'
})
export class HotelBookingModalComponent {
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

  public cardId: string; // Para almacenar el ID de la tarjeta

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }) {
    this.cardId = data.id;  // Recibir el ID de la tarjeta
  }

  ngOnInit() {
    if (!this.src) {
      this.src = this.defaultImage;
    }
    console.log('ID de la tarjeta:', this.data.id);
  }

}
