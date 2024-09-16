import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { TransportVewComponent } from '../components/transport-funtion/transport-vew/transport-vew.component';
import { ViewDataHotelComponent } from '../components/hotel-funtions/view-data-hotel/view-data-hotel.component';

@Injectable({
  providedIn: 'root'
})
export class ModalVewPaqueteService {

  constructor(
    private apiService: ApiService, // Inyecta el servicio existente
    private dialog: MatDialog
  ) { }

  public openModalBasedOnId(id: string): void {
    const hotelFilter = { id };
    const transportFilter = { id };

    this.apiService.filterTransport(transportFilter).subscribe(
      (transportResponse: any) => {
        if (Array.isArray(transportResponse) && transportResponse.length > 0) {
          this.dialog.open(TransportVewComponent, {
            data: transportResponse // Pasa los datos al modal si es necesario
          });
        } else {
          this.apiService.filterHotels(hotelFilter).subscribe(
            (hotelResponse: any) => {
              if (Array.isArray(hotelResponse) && hotelResponse.length > 0) {
                this.dialog.open(ViewDataHotelComponent, {
                  data: hotelResponse // Pasa los datos al modal si es necesario
                });
              } else {
                console.warn('ID no encontrado en transporte ni en hotel:', id);
              }
            },
            (error) => {
              console.error('Error al buscar hoteles:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al buscar transportes:', error);
      }
    );
  }
}
