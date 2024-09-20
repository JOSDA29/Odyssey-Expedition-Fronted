import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-hotel',
  templateUrl: './card-hotel.component.html',
  styleUrls: ['./card-hotel.component.scss']
})
export class CardHotelComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
  ){}

  @Input() price: number = 600000;
  @Input() departure: string = '';
  @Input() type: string = '';
  @Input() desde: string = 'Desde';
  @Input() noches: string = 'Alojamiento';
  @Input() service: string = '';
  @Input() cant: string = 'persona';
  @Input() title: string = 'Four Seasons Hotel Casa Medina';
  @Input() src: string | undefined = '';
  @Input() id: any

  defaultImage: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png';

  ngOnInit() {
    if (!this.src) {
      this.src = this.defaultImage;
    }
    console.log(this.id);
  }

buy(){
  const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
const data = {
  adviserEmail: 'adviser@example2.com',
  billingDate: formattedDate,
  service: 'TV001',
  paymentMethod: 'creditCard',
  serviceType: 'Transport',
  description: 'La venta se ha realizado con exito',
  state: 'cerrado ganado'
}

this.apiService.transation(data).subscribe(
  response => {
    const url = response.paymentURL;
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      this.router.navigate([url]);
    }
  },
  (error) => {
    console.log('error compra: ', error);
  }
);
}

}
