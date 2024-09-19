import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService <T> {

  // BehaviorSubject para almacenar los resultados de búsqueda
  private searchResultsSubject = new BehaviorSubject<T | null>(null);

  // Observable para los componentes que quieran suscribirse a los resultados
  searchResults$: Observable<T | null> = this.searchResultsSubject.asObservable();

  // Método para actualizar los resultados de búsqueda
  updateSearchResults(results: T): void {
    this.searchResultsSubject.next(results);
  }

  // Método para obtener los resultados actuales (opcional)
  getCurrentResults(): T | null {
    return this.searchResultsSubject.getValue();
  }
}
