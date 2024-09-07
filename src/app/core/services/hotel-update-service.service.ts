import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loadComponent {
  // Subject que emitirá eventos de actualización de hoteles
  private loadComponents = new Subject<void>();

  // Observable al que los componentes pueden suscribirse
  loadComponent$ = this.loadComponents.asObservable();

  // Método para notificar que un hotel ha sido actualizado o agregado
  notifyHotelUpdated() {
    this.loadComponents.next();
  }
}
