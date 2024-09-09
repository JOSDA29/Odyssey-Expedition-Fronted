import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<any>(null); // Inicialmente false

  isLoggedIn$ = this.loggedIn.asObservable(); // Observable que se suscribirá

  constructor() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.loggedIn.next(isLoggedIn === 'true' ? true : false); // Asegura que siempre sea un booleano
  }

  setLoggedIn(value: boolean) {
    localStorage.setItem('isLoggedIn', value.toString());
    this.loggedIn.next(value); // Cambia el estado del BehaviorSubject
  }
}
