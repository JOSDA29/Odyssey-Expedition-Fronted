import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { HotelData } from '../../../../core/models/hotel/hotelData';
import { getTransport } from '../../../../core/models/transport/getTransports';
import { updateTransport } from '../../../../core/models/transport/updateTransport';

@Component({
  selector: 'app-cards-services-list',
  templateUrl: './cards-services-list.component.html',
  styleUrls: ['./cards-services-list.component.scss']
})
export class CardsServicesListComponent implements OnInit {
  @Input() titleSection: string = '';

  public transports: getTransport[] = [];
  public filteredFlights: getTransport[] = [];  // Transportes de tipo 'vuelo'
  public filteredCruises: getTransport[] = [];  // Transportes de tipo 'crucero'
  public hotels: HotelData[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Obtener todos los transportes
    const filterTransport: updateTransport = {};
    this.apiService.filterTransport(filterTransport)
      .subscribe(
        (res: getTransport[]) => {
          this.transports = res.map(transport => {
            // Calcula las noches solo una vez y guarda el valor en el objeto
            transport.nights = this.calculateNights(transport);
            return transport;
          });
  
          // Filtrar transportes por tipo 'vuelo' y 'crucero'
          this.filteredFlights = this.transports.filter(transport => transport.transporttype.toLowerCase() === 'vuelo');
          this.filteredCruises = this.transports.filter(transport => transport.transporttype.toLowerCase() === 'crucero');
        },
        (error) => {
          console.error('Error fetching transports:', error);
        }
      );
  
    // Obtener hoteles
    const filter = {};
    this.apiService.filterHotels(filter)
      .subscribe(
        (res: HotelData[]) => {
          this.hotels = res;
        },
        (error) => {
          console.error('Error fetching hotels:', error);
        }
      );
  }
  
  // Modificación de la función calculateNights para calcular solo una vez
  calculateNights(transport: getTransport): number {
    const arrivalDate = new Date(transport.arrivaldate);
    const departureDate = new Date(transport.departuredate);
  
    // Validar si las fechas son válidas
    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) {
      console.warn('Fechas inválidas recibidas:', transport);
      return 0; // Retorna 0 si alguna de las fechas es inválida
    }
  
    // Calcular la diferencia en días
    const diffTime = departureDate.getTime() - arrivalDate.getTime();
    const diffDays = Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24)); 
  
    return diffDays;
  }

  // Métodos para verificar si hay elementos válidos
  hasValidFlights(): boolean {
    return this.filteredFlights.some(flight => flight.state !== false);
  }

  hasValidCruises(): boolean {
    return this.filteredCruises.some(cruise => cruise.state !== false);
  }

  hasValidHotels(): boolean {
    return this.hotels.some(hotel => hotel.state !== false);
  }
}
