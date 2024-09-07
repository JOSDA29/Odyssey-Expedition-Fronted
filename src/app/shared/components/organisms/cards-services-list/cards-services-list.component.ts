import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Flight } from '../../../../core/models/transport/Fligths';
import { HotelData } from '../../../../core/models/hotel/hotelData';

@Component({
  selector: 'app-cards-services-list',
  templateUrl: './cards-services-list.component.html',
  styleUrls: ['./cards-services-list.component.scss'] // Corrige "styleUrl" por "styleUrls"
})
export class CardsServicesListComponent implements OnInit {
  @Input() titleSection: string = '';

  public flights: Flight[] = [];
  public hotels: HotelData[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Obtener vuelos
    this.apiService.getFlights()
      .subscribe(
        (res: Flight[]) => {
          this.flights = res;
        },
        (error) => {
          console.error('Error fetching flights:', error);
        }
      );

    // Obtener hoteles
    this.apiService.getHotels()
      .subscribe(
        (res: HotelData[]) => {
          this.hotels = res;
          console.log('data hotel:',this.hotels);
        },
        (error) => {
          console.error('Error fetching hotels:', error);
        }
      );
  }
}
