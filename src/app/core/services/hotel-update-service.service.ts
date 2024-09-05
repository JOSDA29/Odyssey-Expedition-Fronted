import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelUpdateService {
  // Subject que emitirá eventos de actualización de hoteles
  private hotelUpdatedSource = new Subject<void>();

  // Observable al que los componentes pueden suscribirse
  hotelUpdated$ = this.hotelUpdatedSource.asObservable();

  // Método para notificar que un hotel ha sido actualizado o agregado
  notifyHotelUpdated() {
    this.hotelUpdatedSource.next();
  }
}
