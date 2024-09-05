import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) { }

  handleError(error: HttpErrorResponse): string {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Por favor verifica los datos enviados.';
          break;
        case 401:
          errorMessage = 'Correo o contraseña incorrectos';
          this.sweetAlertService.showError(errorMessage, 'Error de autenticación', () => {
            this.router.navigate(['/']); // Redirige a la página principal
          });
          return errorMessage; // Salir de la función para evitar la doble llamada de showError
        case 403:
          errorMessage = 'La sesión ha expirado, ingrese nuevamente';
          this.sweetAlertService.showError(errorMessage, 'La sesión ha expirado, ingrese nuevamente', () => {
            this.router.navigate(['/']); 
          });
          break;
        case 404:
          errorMessage = 'Recurso no encontrado. Por favor verifica la URL.';
          break;
        case 409:
          errorMessage = 'Correo electrónico ya registrado.';
          break;
        case 422:
          errorMessage = 'Verifica que el número de teléfono tenga 10 dígitos y sean números.';
          break;
        case 500:
          errorMessage = 'Verifica tu conexión a internet o intentalo más tarde';
          break;
        default:
          errorMessage = `Error desconocido: ${error.message}`;
      }

      if (error.status !== 401) {
        this.sweetAlertService.showError(errorMessage);
      }
    }

    return errorMessage;
  }
}
